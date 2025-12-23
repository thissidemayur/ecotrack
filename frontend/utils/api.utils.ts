import { AxiosError } from "axios";
import { IApiResponse } from "../types/api.type";

export interface HookResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errMsgList?: string | null;
}

/**
 * @description Centralized Error Handler for Axios Responses
 */
export const handleApiError = (error: any): HookResponse => {
  const err = error as AxiosError<IApiResponse<null>>;
  const responseData = err.response?.data;

  // Default fallbacks
  let message = "An Unknown error occurred";
  let errMsgList = "";

  if (responseData) {
    // 1. Prioritize the message from the backend
    message = responseData.message || message;

    // 2. Check if the 'error' field is an array and format it
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      errMsgList = responseData.errors
        .map((errItem, idx) => `${idx + 1}. ${errItem}`)
        .join("\n");
    }
    console.log("errMsgList", errMsgList);
    console.log("errmsg: ",message)
  } else if (err.message) {
    // Fallback for network/system errors
    message = err.message;
  }

  return {
    success: false,
    message,
    errMsgList: errMsgList || undefined,
    data: null,
  };
};

/**
 * @description Centralized Success Handler
 */
export const handleApiSuccess = <T>(response: any): HookResponse<T> => {
  return {
    success: true,
    message: response.data.message || "Success",
    data: response.data.data,
    errMsgList: null,
  };
};
