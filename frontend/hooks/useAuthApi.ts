import {
  handleApiError,
  handleApiSuccess,
} from "@/utils/api.utils";
import { api } from "../api/axios";
import { useAuthStore } from "../state/authStore";
import { IApiResponse } from "../types/api.type";
import { AuthData } from "../types/authApi.type";
import { toast } from "sonner";

export const useAuthApi = () => {
  const { setUser, setAccessToken, clearAuth, setAuthenticating } =
    useAuthStore();

  // 1. REGISTER - Triggers Verification Email
  const registerUser = async (email: string, password: string) => {
    setAuthenticating(true);
    try {
      const response = await api.post<IApiResponse<{ email: string }>>(
        "/auth/register",
        { email, password }
      );
      const result = handleApiSuccess(response);
      toast.success(result.message || "Verification email sent!");
      return result;
    } catch (error) {
      const { message, errMsgList } = handleApiError(error);
      toast.error(errMsgList || message);
      return handleApiError(error);
    } finally {
      setAuthenticating(false);
    }
  };

  // 2. VERIFY EMAIL - Finalizes Registration
  const verifyEmail = async (token: string) => {
    setAuthenticating(true);
    try {
      const response = await api.post<IApiResponse<AuthData>>(
        `/auth/verify-email/${token}`
      );
      const result = handleApiSuccess<AuthData>(response);

      if (result.data) {
        setUser(result.data.user);
        setAccessToken(result.data.accessToken);
        toast.success("Email verified successfully!");
      }
      return result;
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(message);
      return handleApiError(error);
    } finally {
      setAuthenticating(false);
    }
  };

  // 3. LOGIN - Triggers OTP
  const loginUser = async (email: string, password: string) => {
    setAuthenticating(true);
    try {
      const response = await api.post<
        IApiResponse<{ requiresOtp: boolean; email: string }>
      >("/auth/login", { email, password });

      const result = handleApiSuccess(response);
      // We don't set user here yet, just return the instruction
      if (result.data?.requiresOtp ) {
        toast.success("Security code sent to your email");
      }
      return result;
    } catch (error) {
      const { message, errMsgList } = handleApiError(error);
      toast.error(errMsgList || message);
      return handleApiError(error);
    } finally {
      setAuthenticating(false);
    }
  };

  // 4. VERIFY OTP - Finalizes Login
  const verifyOtp = async (email: string, otp: string) => {
    setAuthenticating(true);
    try {
      const response = await api.post<IApiResponse<AuthData>>(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      const result = handleApiSuccess<AuthData>(response);
      if (result.data) {
        setUser(result.data.user);
        setAccessToken(result.data.accessToken);
        toast.success("Welcome back to EcoTrack!");
      }
      return result;
    } catch (error) {
      const { message } = handleApiError(error);
      toast.error(message);
      return handleApiError(error);
    } finally {
      setAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post<IApiResponse<null>>("/auth/logout");
      clearAuth();
      toast.success(response.data.message || "Logged out");
      return handleApiSuccess<null>(response);
    } catch (error) {
      clearAuth(); // Clear anyway for safety
      return handleApiError(error);
    }
  };

  const rotateRefreshToken = async () => {
    try {
      const response = await api.post<IApiResponse<AuthData>>("/auth/refresh");
      if (response.data.success) {
        setUser(response.data.data.user);
        setAccessToken(response.data.data.accessToken);
      }
      return handleApiSuccess(response);
    } catch (error) {
      clearAuth();
      return handleApiError(error);
    }
  };

  return {
    registerUser,
    verifyEmail,
    loginUser,
    verifyOtp,
    logout,
    rotateRefreshToken,
  };
};
