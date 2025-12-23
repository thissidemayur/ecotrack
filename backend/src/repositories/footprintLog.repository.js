// Will handle CRUD operations for the FootprintLog model, primarily focused on: Creation,reterieval, and Aggregation-based reporting.// /repositories/footprintLog.repository.js

import { FootprintLog } from '../models/FootprintLog.js';
import mongoose from 'mongoose';  
/**
 * @class FootprintLogRepository
 * @description Provides database abstraction for the FootprintLog model.
 */
class FootprintLogRepository {
  /**
   * @description Creates and saves a new footprint calculation log.
   * @param {Object} logData - The full data object including userId, activityData, and calculated results.
   * @returns {Promise<FootprintLog>} - Returns the newly created log document.
   */
  async createLog(logData) {
    return await FootprintLog.create(logData);
  }

  /**
   * @description Fetches all historical footprint logs for a specific user.
   * @param {string} userId - ID of the user whose history is requested.
   * @returns {Promise<Array<FootprintLog>>} - Returns an array of log documents, ordered by date.
   */
  async findByUserId(userId) {
    return await FootprintLog.find({ userId })
      .sort({ dateCalculated: 1 }) // Order by ascending date for history charts
      .select(
        "period results.total_co2e results.breakdown_co2e dateCalculated"
      ); // Select only necessary fields
  }

  /**
   * @description Fetches a single footprint log by its ID, ensuring it belongs to the specified user.
   * @param {string} logId - ID of the specific log document.
   * @param {string} userId - ID of the owning user for security check.
   * @returns {Promise<FootprintLog|null>} - Returns the log document or null if not found/unauthorized.
   */
  async findByIdAndUser(logId, userId) {
    return await FootprintLog.findOne({ _id: logId, userId });
  }

  /**
   * @description Calculates the global average carbon footprint based on the latest submission from each user.
   * @returns {Promise<number>} - Returns the average total_co2e as a number.
   */
  async getGlobalAverage() {
    // Mongoose Aggregation Pipeline:
    // 1. Sort all logs by user and date.
    // 2. Group by userId and pick the $first (latest) log.
    // 3. Calculate the average of the latest total_co2e figures.
    const result = await FootprintLog.aggregate([
      // Stage 1: Sort by user and date descending to ensure the latest log is first in the group
      { $sort: { userId: 1, dateCalculated: -1 } },

      // Stage 2: Group by userId and pick the latest log's total_co2e
      {
        $group: {
          _id: "$userId",
          latestFootprint: { $first: "$results.total_co2e" },
        },
      },

      // Stage 3: Calculate the overall average of the latest footprints
      {
        $group: {
          _id: null,
          globalAverage: { $avg: "$latestFootprint" },
        },
      },
    ]);

    // Returns 0 if no logs exist, otherwise the calculated average
    return result.length > 0 ? result[0].globalAverage : 0;
  }

  /**
   * @description Fetches aggregated, filtered, and paginated data for the Admin Dashboard.
   * @param {Object} filterOptions - Options for filtering (e.g., region, minC02e, homeSize).
   * @param {number} limit - The number of documents to return.
   * @param {number} skip - The number of documents to skip (for pagination).
   * @returns {Promise<Array<FootprintLog>>} - Returns filtered log documents.
   */
  async getAdminFilteredLogs(filterOptions, limit, skip) {
    const query = {};

    // Example dynamic filter based on filterOptions
    if (filterOptions.minC02e) {
      query["results.total_co2e"] = { $gte: filterOptions.minC02e };
    }
    if (filterOptions.homeSize) {
      query["activityData.home_size_sqm"] = { $gte: filterOptions.homeSize };
    }
    // Admin queries are complex, requiring separate logic for region/consumption,
    // often using additional lookup/aggregation stages.

    return await FootprintLog.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ dateCalculated: -1 });
  }


  /**
   * @description Aggregates total emissions grouped by month for a specific user.
   * @param {string} userId - ID of the user.
   * @returns {Promise<Array>} - Returns an array of { month, totalEmissions }
   */
  async getMonthlyAnalytics(userId) {
    return await FootprintLog.aggregate([
      // Stage 1: Filter logs by user
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },

      // Stage 2: Group by the 'period' field (YYYY-MM) and sum totals
      {
        $group: {
          _id: "$period",
          totalEmissions: { $sum: "$results.total_co2e" },
          // Optional: average per month
          avgEmissions: { $avg: "$results.total_co2e" },
          count: { $sum: 1 },
        },
      },

      // Stage 3: Sort by period ascending (chronological)
      { $sort: { _id: 1 } },

      // Stage 4: Project into a cleaner format for the frontend
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalEmissions: { $round: ["$totalEmissions", 2] },
          avgEmissions: { $round: ["$avgEmissions", 2] },
          count: 1,
        },
      },
    ]);
  }
}

export const footprintLogRepository = new FootprintLogRepository();