// /services/user.service.js

import { userRepository } from "../repositories/user.repository.js";
import { bcryptService } from "./bcrypt.service.js"; // Import your existing bcrypt service
import { ApiError } from "../utils/apiError.utils.js";

/**
 * @class UserService
 * @description Manages user profile, password, and account information updates.
 * This class handles business logic for account maintenance features.
 */
class UserService {
  /**
   * @description Retrieves the profile data for the authenticated user.
   * @param {string} userId - ID of the user.
   * @returns {Promise<Object>} - The user profile object (without sensitive data).
   */
  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError(404, "User profile not found.");
    }

    // Return a clean object (Mongoose toObject method is usually ideal here)
    const userDto = user.toObject();
    delete userDto.password;
    delete userDto.refreshTokenHash;

    return userDto;
  }

  /**
   * @description Allows a user to update their non-sensitive profile information.
   * @param {string} userId - ID of the user.
   * @param {Object} updateData - Data to update (e.g., username, region).
   * @returns {Promise<Object>} - The updated user profile object.
   */
  async updateProfile(userId, updateData) {
    // Use the repository method created specifically for profile updates
    const updatedUser = await userRepository.updateUser(userId, updateData);

    if (!updatedUser) {
      throw new ApiError(
        404,
        "User not found or profile could not be updated."
      );
    }

    // The repository method is set up to already exclude password/token hash
    return updatedUser;
  }

  /**
   * @description Allows a user to change their password securely.
   * @param {string} userId - ID of the user.
   * @param {string} oldPassword - The user's current password.
   * @param {string} newPassword - The new password the user wishes to set.
   * @returns {Promise<void>} - Resolves on successful password change.
   */
  async changePassword(userId, oldPassword, newPassword) {
    // 1. Fetch user with password hash for comparison
const user = await userRepository.findByIdWithPassword(userId);
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    // 2. Verify the old password
    const isPasswordValid = await bcryptService.compare(
      oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid current password.");
    }

    // 3. Hash the new password
    const hashedNewPassword = await bcryptService.hash(newPassword);

    // 4. Update the password in the database
    // NOTE: We directly update the 'password' field. We also invalidate the refresh token
    // hash as a security measure, forcing a re-login after a password change.
    await userRepository.updateUser(userId, {
      password: hashedNewPassword,
      refreshTokenHash: null, // Security: Invalidate all existing sessions
    });

    // The tokens are now invalid, forcing the user to log back in with the new password.
  }

}

export const userService = new UserService();
// Data Transfer Objects (DTOs)