import { handleApiError, handleApiSuccess, HookResponse } from "@/utils/api.utils";
import { api } from "../api/axios";
import { useAuthStore } from "../state/authStore";
import {  IApiResponse } from "../types/api.type";
import { AuthData, RefreshTokenData } from "../types/authApi.type";
import { toast } from "sonner";

export const useAuthApi = () => {
  const { setUser, setAccessToken, clearAuth } = useAuthStore();

  const registerUser = async (
    username: string | null,
    email: string,
    password: string
  ) => {
    useAuthStore.getState().setAuthenticating(true);
    try {
      const response = await api.post<IApiResponse<AuthData>>(
        "/auth/register",
        { username, email, password }
      );

      const result = handleApiSuccess<AuthData>(response);
      if (result.data) {
        setUser(result.data.user);
        setAccessToken(result.data.accessToken);
        toast.success(result.message);
      }
      return result;
    } catch (error) {
      console.log("Error in registerUser: ", handleApiError(error));
      const { success, message, errMsgList } = handleApiError(error);
      if (errMsgList && errMsgList !== "") {
        console.log(`Error List:\n${errMsgList}`);
        toast.error(errMsgList );
      } else {
        console.log(`Error Message: ${message}`);
        toast.error(message)
      }
    } finally {
      useAuthStore.getState().setAuthenticating(false);
    }
  };

  const loginUser = async (
    email: string,
    password: string
   ) => {
    useAuthStore.getState().setAuthenticating(true);
    try {
      const response = await api.post<IApiResponse<AuthData>>("/auth/login", {
        email,
        password,
      });

      const result = handleApiSuccess<AuthData>(response);
        if (result.data) {
        setUser(result.data.user);
        setAccessToken(result.data.accessToken);
        toast.success(result.message);
      }

      return result;
    } catch (error) {
      const { success, message, errMsgList } = handleApiError(error);
      if (errMsgList && errMsgList !== "") {
        console.log(`Error List:\n${errMsgList}`);
        toast.error(errMsgList);
      } else {
        toast.error(message);
      }  
    } finally {
      useAuthStore.getState().setAuthenticating(false);
    }
  };

  const logout = async (): Promise<HookResponse<null>> => {
    try {
      const response = await api.post<IApiResponse<null>>("/auth/logout");
      console.log("Logout response:", response);
      clearAuth()
      toast.success(response.data.message);
      return handleApiSuccess<null>(response);
    } catch (error) {
      const {message}= handleApiError(error);
      toast.error(message);
      return handleApiError(error)
    } finally {
      clearAuth();
    }
  };

  
  const rotateRefreshToken = async()=> {
    try {
      const response = await api.post<IApiResponse<AuthData>>("/auth/refresh")
      if(response.data) {
        setUser(response.data.data.user)
        setAccessToken(response.data.data.accessToken)
      }
      toast.success(response.data.message)
      return handleApiSuccess<RefreshTokenData>(response)
    } catch (error) {
      setUser(null)
      setAccessToken(null)
      const {success,errMsgList,message} =  handleApiError(error)
      if (errMsgList && errMsgList !== "" && errMsgList !== null) {
        console.log(`Error List:\n${errMsgList}`);
        toast.error(errMsgList);
      }else if (message){
        toast.error(message);
      }
    } 

  }

  return { registerUser, loginUser, logout, rotateRefreshToken };
};
