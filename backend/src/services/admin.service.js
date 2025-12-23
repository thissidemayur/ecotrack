// /services/admin.service.js

import { footprintLogRepository } from "../repositories/footprintLog.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.utils.js";
import { redisClient } from "../config/redis.js";

/**
 * @class AdminService
 * @description Provides core business logic for the Admin Dashboard, including global analytics,
 * aggregated data filtering, and leaderboard retrieval.
 */
class AdminService {
  // Key for the Redis Sorted Set used for the global leaderboard
  REDIS_LEADERBOARD_KEY = "global_footprints";

  // Key for caching the calculated global average
  REDIS_GLOBAL_AVERAGE_KEY = "global_avg_cfp";

  /**
   * @description Fetches all high-level metrics required for the main Admin dashboard summary.
   * @returns {Promise<Object>} - Contains global average, total users, and leaderboard data.
   */
  async fetchGlobalDashboardData() {
    const pipeline = [];

    // --- 1. Get Global Average Footprint (Use Cache) ---
    // Try to fetch from Redis first to avoid heavy DB load
    let globalAverage = await redisClient.get(this.REDIS_GLOBAL_AVERAGE_KEY);

    if (!globalAverage) {
      // Cache Miss: Calculate the average using the MongoDB aggregation pipeline
      globalAverage = await footprintLogRepository.getGlobalAverage();

      // Cache the calculated value for 1 hour (example TTL)
      await redisClient.set(this.REDIS_GLOBAL_AVERAGE_KEY, globalAverage, {
        EX: 3600,
      });
    } else {
      // Convert cached string back to number
      globalAverage = parseFloat(globalAverage);
    }

    // --- 2. Get Total User Count ---
    const totalUsers = await userRepository.countAllUsers(); // Assuming this method exists

    // --- 3. Get Top/Bottom 10 Leaderboards (Fast Redis Lookup) ---

    // ZRANGE: Get top scores (highest CO2e). WITHSCORES returns score alongside member.
    // We fetch 0 to 9 (10 entries).
    const topFootprintsRaw = await redisClient.zRangeWithScores(
      this.REDIS_LEADERBOARD_KEY,
      0,
      9,
      { REV: true } // This replaces zRevRange
    );

    // ZRANGE: Get bottom scores (lowest CO2e).
    const bottomFootprintsRaw = await redisClient.zRangeWithScores(
      this.REDIS_LEADERBOARD_KEY,
      0,
      9
    );

    // HELPER UPDATE: Node-Redis v4 returns an array of OBJECTS [{value: '...', score: 10}, ...]
    // So you don't need your manual 'formatRedisOutput' loop anymore!
    const formatRedisOutput = (rawArray) => {
      return rawArray.map((item) => ({
        userId: item.value, // Node-Redis v4 uses 'value' for the member
        co2e: parseFloat(item.score),
      }));
    };

    // --- 4. Enhance Leaderboard Data with User Info (e.g., username, region) ---
    // This is necessary because Redis only stores ID and score.
    // We use a Promise.all() query to efficiently fetch user details for the top/bottom IDs.
    const topUserIds = formatRedisOutput(topFootprintsRaw).map(
      (item) => item.userId
    );
    const bottomUserIds = formatRedisOutput(bottomFootprintsRaw).map(
      (item) => item.userId
    );

    const allLeaderboardUsers = await userRepository.findUsersByIds([
      ...topUserIds,
      ...bottomUserIds,
    ]); // Assuming this repository method exists

    const usersMap = allLeaderboardUsers.reduce((acc, user) => {
      acc[user._id.toString()] = {
        username: user.username,
        region: user.region,
      };
      return acc;
    }, {});

    const enhanceList = (list) =>
      list.map((item) => ({
        ...item,
        userInfo: usersMap[item.userId] || { username: "N/A", region: "N/A" },
      }));

    return {
      globalAverage: parseFloat(globalAverage.toFixed(2)),
      totalUsers,
      topPerformers: enhanceList(formatRedisOutput(topFootprintsRaw)),
      bottomPerformers: enhanceList(formatRedisOutput(bottomFootprintsRaw)),
      //
    };
  }

  /**
   * @description Fetches detailed log data for admin analysis, applying dynamic filtering, sorting, and pagination.
   * @param {Object} queryOptions - Filter, sort, and pagination parameters from the request query.
   * @returns {Promise<Array<Object>>} - Array of detailed, filtered log documents.
   */
  async getAggregatedFootprints(queryOptions) {
    const {
      page = 1,
      limit = 20,
      sortBy = "dateCalculated",
      sortOrder = -1,
      ...filterOptions
    } = queryOptions;

    const skip = (page - 1) * limit;

    // Call the repository with detailed options
    const logs = await footprintLogRepository.getAdminFilteredLogs(
      filterOptions,
      limit,
      skip,
      sortBy,
      sortOrder
    );

    // (Optional): Add further business logic here, such as calculating percentile rank within the filtered set.

    return logs;
  }

  /**
   * @description Allows an administrator to validate a user account (e.g., setting a verified status).
   * @param {string} userId - The ID of the user to be validated.
   * @returns {Promise<Object>} - The updated user document.
   */
  async validateUserAccount(userId) {
    // Assuming a repository method exists to update user status
    const updatedUser = await userRepository.updateUser(userId, {
      isVerified: true,
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found for validation.");
    }

    return updatedUser;
  }
}

export const adminService = new AdminService();
