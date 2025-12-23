// @/hooks/useUserApi.ts
import { useCallback, useState } from "react";
import { api } from "@/api/axios";
import { useAuthStore } from "@/state/authStore";
import { IApiResponse } from "@/types/api.type";
import { handleApiError, handleApiSuccess } from "@/utils/api.utils";
import { toast } from "sonner";

export const useUserApi = () => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const updateUserStore = useAuthStore((state) => state.updateUser);

  // 1. Sync Profile (GET /me)
  const fetchMe = useCallback(async () => {
    setIsUserLoading(true);
    try {
      const response = await api.get<IApiResponse<any>>("/users/me");
      if (response.data.success) {
        updateUserStore(response.data.data);
        toast.success(response.data.message)
      }
      return handleApiSuccess(response);
    } catch (error) {
      return handleApiError(error);
    } finally {
      setIsUserLoading(false);
    }
  }, [updateUserStore]);

  // 2. Update Profile (PATCH /update-profile)
  const updateProfile = useCallback(
    async (updateData: any) => {
      setIsUserLoading(true);
      try {
        const response = await api.patch<IApiResponse<any>>(
          "/users/update-profile",
          updateData
        );

        if (response.data.success) {
          // ACTION-BASED SYNC: Update store with the new user object returned by backend
          updateUserStore(response.data.data);
          toast.success("Profile updated successfully");
        }
        return handleApiSuccess(response);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err.message);
        return err;
      } finally {
        setIsUserLoading(false);
      }
    },
    [updateUserStore]
  );

  // 3. Change Password (POST /change-password)
  const changePassword = useCallback(async (passwordData: any) => {
    setIsUserLoading(true);
    try {
      const response = await api.post<IApiResponse<null>>(
        "/users/change-password",
        passwordData
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return handleApiSuccess(response);
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err.message);
      return err;
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  return { fetchMe, updateProfile, changePassword, isUserLoading };
};
