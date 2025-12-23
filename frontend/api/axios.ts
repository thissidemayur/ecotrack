import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuthStore } from "../state/authStore";
import { IApiResponse } from "../types/api.type"; // Import from your new file
import { AuthData } from "../types/authApi.type";



interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_BASE_URL = "http://localhost:3000/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/**
 * @description Attempts to refresh the access token using the HTTPOnly Refresh token cookies
 */
const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await api.post<IApiResponse<AuthData>>("/auth/refresh");
    const { user: userData, accessToken: newAccessToken } = response.data.data;

    // Update Zustand state
    useAuthStore.getState().setAccessToken(newAccessToken);
    useAuthStore.getState().setUser(userData);

    return newAccessToken;
  } catch (error) {
    useAuthStore.getState().clearAuth();
    console.error("Error refreshing access token: ", error);
    throw error
  }
};

/**
 * @description Axios Request Interceptor: Injects the Access Token
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * @description Axios Response Interceptor: Handles 401s
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const status = error.response?.status;
    const url = originalRequest.url || "";
    const isAuthPath = url?.includes("/auth/");
    console.log(
      `[Interceptor] Request to: ${url} | Status: ${status} | isAuth: ${isAuthPath}`
    );
    // Check 401, ensure not a refresh call, and not already retried
    if (
      status === 401 &&
      !isAuthPath &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();

        // Update the header of the original failed request and retry
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // We use the 'api' instance to retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed: ", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
