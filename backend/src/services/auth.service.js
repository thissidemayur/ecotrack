import { jwtService } from "./jwt.service.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/apiError.utils.js";
import { bcryptService } from "./bcrypt.service.js";
import crypto from "crypto";
import { redisClient } from "../config/redis.js";
import { sendMail } from "../config/sendMail.js";
import { getOtpHtml, getVerifyEmailHtml } from "../utils/emailHTMLTemplate.js";
import { generateOTP } from "./helperMethods.js";


class AuthService {
  /**
   * @description Initiates the registration process by sending a verification email.
   * @param {Object} userData - { email, password }
   * @returns {Promise<Object>} - Status message (User is not created in DB yet)
   */
  async registerUser({ email, password }) {
    const existingUser = await userRepository.findByEmail(email, false);
    if (existingUser) {
      throw new ApiError(409, "Email already in use");
    }

    const hashedPassword = await bcryptService.hash(password);

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyKey = `verify:${verifyToken}`;

    // Store pending user data in Redis
    const dataStore = JSON.stringify({ email, password: hashedPassword });
    await redisClient.set(verifyKey, dataStore, { EX: 5 * 60 });

    const subject = "Verify your email address - EcoTrack";
    const html = getVerifyEmailHtml({ email, token: verifyToken });
    await sendMail({ email, subject, html });

    // RETURN: Only a message. Don't send tokens yet because email isn't verified.
    return {
      message: "Verification email sent. Please check your inbox.",
      email,
    };
  }

  /**
   * @description Finalizes registration: retrieves data from Redis, creates user in DB, and issues tokens.
   * @param {string} token - The verification token from the email link.
   * @returns {Promise<Object>} - User details and initial JWT tokens.
   */
  async verifyEmailToken(token) {
    const verifyKey = `verify:${token}`;

    // 1. Fetch pending data from Redis
    const dataStore = await redisClient.get(verifyKey);

    if (!dataStore) {
      throw new ApiError(
        400,
        "Verification link expired or invalid. Please register again."
      );
    }

    const { email, password } = JSON.parse(dataStore);

    // 2. Create the user in the actual Database
    const newUser = await userRepository.create({
      email,
      password, // already hashed from registerUser step
      isVerified: true, // mark as verified immediately
    });

    // 3. Clean up Redis (don't let the user verify twice)
    await redisClient.del(verifyKey);

    // 4. Generate Session Tokens
    const tokens = await this.generateAndSaveTokens(newUser);

    // 5. Prepare User DTO
    const userDto = newUser.toObject();
    delete userDto.password;
    delete userDto.refreshTokenHash;

    return {
      user: userDto,
      ...tokens,
    };
  }

  /**
   * @description Validates login credentials and sends a 2FA OTP to the user's email.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} - Instructions for the frontend to show the OTP input
   */
  async loginUser(email, password) {
    const user = await userRepository.findByEmail(email, true);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcryptService.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const otp = generateOTP();

    // 🔥 FIX: Store OTP using EMAIL as the key, not the OTP itself.
    // This ensures we know which user is trying to verify.
    const otpKey = `otp:${email}`;
    await redisClient.set(otpKey, otp, { EX: 5 * 60 });

    // Send OTP to email
    const html = getOtpHtml({ email, otp });
    const subject = "Your EcoTrack Login Code";
    await sendMail({ email, subject, html });

    // RETURN: Tell the frontend that OTP is required.
    return {
      message: "Security code sent to your email.",
      requiresOtp: true,
      email,
    };
  }

  /**
   * @description Verifies the 2FA OTP and issues session tokens.
   * @param {string} email
   * @param {string} otp
   * @returns {Promise<Object>} - User details and JWT tokens
   */
  async verifyOTP(email, otp) {
    const otpKey = `otp:${email}`;
    const storedOtp = await redisClient.get(otpKey);

    if (!storedOtp) {
      throw new ApiError(400, "Security code expired. Please login again.");
    }

    if (storedOtp !== String(otp)) {
      throw new ApiError(400, "Invalid security code.");
    }

    // OTP is correct, delete it and proceed
    await redisClient.del(otpKey);

    const user = await userRepository.findByEmail(email, true);
    if (!user) {
      throw new ApiError(401, "User not found.");
    }

    const tokens = await this.generateAndSaveTokens(user);

    const userDto = user.toObject();
    delete userDto.password;
    delete userDto.refreshTokenHash;

    return { user: userDto, ...tokens };
  }

  /**
   * @description Genereate new access and refresh tokens, hashes the refresh token and save in DB
   * @params {User} user - Mongoose user document
   * @return {Promise<Object>} genereated {accessToken, accessTokenExpire, refreshToken}
   */
  async generateAndSaveTokens(user) {
    const tokenPayload = {
      userId: user._id,
      role: user.role,
    };

    // genereate tokens (Access and refresh)
    const { token: accessToken, expiresIn: accessTokenExpire } =
      jwtService.generateToken(tokenPayload, "access");
    const { token: refreshToken, expiresIn: refershTokenexpire } =
      jwtService.generateToken(tokenPayload, "refresh");

    //  create refreshToken hash  and save in db
    const refreshTokenHash = await bcryptService.hash(refreshToken);
    await userRepository.updateRefreshTokenHash(user._id, refreshTokenHash);

    return {
      accessToken,
      accessTokenExpire,
      refreshToken,
    };
  }

  /**
   * @description: refreshing tokens with rotating and reuse detection
   * @params {string} oldRefreshToken - refresh token sent by client
   * @return {Promise<object>} - new access , refresh tokens and user info with userId and role
   * */
  async rotateRefreshToken(oldRefreshToken) {
    // verify old refresh token
    let decodedPayload;
    try {
      decodedPayload = jwtService.verifyToken(oldRefreshToken, "refresh");
    } catch (error) {
      throw error;
    }
    console.log("Decoded Payload:", decodedPayload);

    const { userId, role } = decodedPayload;

    // find the user
    const user = await userRepository.findByIdWithRefreshToken(userId);
    console.log("User from DB:", user);
    if (!user || !user.refreshTokenHash) {
      throw new ApiError(401, "Invalid session. Please login again.");
    }

    // compare the hash of old refresh token with stored hash- to detect reuse
    const isMatch = await bcryptService.compare(
      oldRefreshToken,
      user.refreshTokenHash
    );

    if (!isMatch) {
      console.warn(
        `[SECURITY BREACH DETECTED ] for user ID ${userId}. Invalidating all sessions`
      );

      // invalidate all sessions
      await userRepository.updateRefreshTokenHash({
        userId: user._id,
        refreshTokenHash: null,
      });

      //force user to login
      throw new ApiError(401, "Session compromised. Re-login required.");
    }

    // generate new tokens
    const token = await this.generateAndSaveTokens(user);

    // return access and refresh tokens
    return {
      user: { userId, role },
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      accessTokenExpire: token.accessTokenExpire,
    };
  }

  /**   *
   *  @description logout user by clearing refresh token
   * @params {string} userId - ID of the user to logout
   * */
  async logoutUser(userId) {
    await userRepository.updateRefreshTokenHash(userId, null);
  }
}

export const authService = new AuthService();
