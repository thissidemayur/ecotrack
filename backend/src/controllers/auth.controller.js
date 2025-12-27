import { config } from "../config/index.js"
import { authService } from "../services/auth.service.js"
import { jwtService } from "../services/jwt.service.js"
import { ApiResponse } from "../utils/apiResponse.utils.js"

/**
 * @description Initiates registration. No tokens issued yet.
 */
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Service sends verification email and stores data in Redis
  const result = await authService.registerUser({ email, password });

  return res.status(200).json(
    new ApiResponse(200, result.message, { email: result.email })
  );
};

/**
 * @description Finalizes registration after email link is clicked.
 */
const verifyEmail = async (req, res) => {
  const { token } = req.params; // or req.query depending on your link
  const { user, accessToken, refreshToken } = await authService.verifyEmailToken(token);

  // Set refresh token in httpOnly cookie
  res.cookie(
    config.JWT.REFRESH_COOKIE_NAME,
    refreshToken,
    jwtService.getRefreshCookieOptions()
  );

  return res.status(201).json(
    new ApiResponse(201, "Email verified and account created!", { user, accessToken })
  );
};

/**
 * @description Checks password and sends OTP. No tokens issued yet.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Service sends OTP and returns { requiresOtp: true }
  const result = await authService.loginUser(email, password);

  return res.status(200).json(
    new ApiResponse(200, result.message, { 
      requiresOtp: result.requiresOtp, 
      email: result.email 
    })
  );
};

/**
 * @description Finalizes login after OTP is verified. Tokens issued here.
 */
const verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;
  
  const { user, accessToken, refreshToken } = await authService.verifyOTP(email, otp);

  // Set refresh token in httpOnly cookie
  res.cookie(
    config.JWT.REFRESH_COOKIE_NAME,
    refreshToken,
    jwtService.getRefreshCookieOptions()
  );

  return res.status(200).json(
    new ApiResponse(200, "Login successful!", { user, accessToken })
  );
};

/**
 * @description Handle rerfesh token rqst, rotate the token and issue new Access/Rerfresh Token
 * refresh token is reterieved from HttpOnly cookie
 */
const refreshTokens = async(req,res)=>{
    // 
    const oldRefreshToken = req.cookies[config.JWT.REFRESH_COOKIE_NAME]
    if(!oldRefreshToken) throw new ApiResponse(401,"Refresh token missing",null)
    
    const {user,accessToken,refreshToken} = await authService.rotateRefreshToken(oldRefreshToken)

    // set new refresh token in httpOnly cookie
    res.cookie(
        config.JWT.REFRESH_COOKIE_NAME,
        refreshToken,
        jwtService.getRefreshCookieOptions()
    )

    return res.status(200).json(new ApiResponse(200,"Tokens refreshed successfully",{
        user,accessToken
    }))

}


/**
 * @description  logout user session by removing the refresh token hash from DB
 */
const logoutUser = async(req,res)=>{
    const refreshToken = req.cookies[config.JWT.REFRESH_COOKIE_NAME]
    let userId = null

    try {
        if(refreshToken) {
            const decoded = jwtService.verifyToken(refreshToken,"refresh")
            userId = decoded.userId
        }
    } catch (error) {
        
    }

    if(userId){
        await authService.logoutUser(userId)
    }

    // clear cookies
    res.clearCookie(config.JWT.REFRESH_COOKIE_NAME,jwtService.getClearCookieOptions())
    return res.status(200).json(new ApiResponse(200,"User logged out successfully",null))
}


export {
  refreshTokens,
  logoutUser,
  registerUser,
  loginUser,
  verifyEmail,
  verifyLoginOTP,
};