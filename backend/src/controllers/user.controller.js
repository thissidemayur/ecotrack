// /controllers/user.controller.js

import { userService } from "../services/user.service.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

/**
 * @function getMe
 * @description Handles the GET request to retrieve the authenticated user's profile data.
 * @route GET /api/v1/users/me
 * @access Private (User)
 */
export const getMe = async (req, res) => {
  const userId = req.user.id; // ID set by the isAuth middleware
  console.log("Fetching profile for user ID:", userId);
  // 1. Call the Service to fetch the user profile
  const profile = await userService.getProfile(userId);

  // 2. Send successful response
  return res
    .status(200)
    .json(
      new ApiResponse(200,  "User profile retrieved successfully." 
        ,profile,)
    );
};

/**
 * @function updateProfile
 * @description Handles the POST request to update the user's non-sensitive profile details.
 * @route POST /api/v1/users/update-profile
 * @access Private (User)
 */
export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  // req.body is already validated by Zod (e.g., username, region, etc.)
  const updateData = req.body;

  // 1. Call the Service to update the profile
  const updatedProfile = await userService.updateProfile(userId, updateData);

  // 2. Send successful response
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProfile, "User profile updated successfully.")
    );
};

/**
 * @function changePassword
 * @description Handles the POST request to securely change the user's password.
 * @route POST /api/v1/users/change-password
 * @access Private (User)
 */
export const changePassword = async (req, res) => {
  const userId = req.user.id;
  // Data validated by Zod schema (should contain oldPassword and newPassword)
  const { oldPassword, newPassword } = req.body;

  // 1. Call the Service to handle password validation, hashing, and database update.
  // The service also invalidates the refresh token hash as a security measure.
  await userService.changePassword(userId, oldPassword, newPassword);

  // 2. Send successful response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Password changed successfully. Please log in again with your new password.", 
        null,
      )
    );
};
