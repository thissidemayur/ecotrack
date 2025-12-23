import { IAdminSummary } from "@/types/admin.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AdminStore {
  summary: IAdminSummary | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setSummary: (summary: IAdminSummary) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetAdminStore: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      summary: null,
      isLoading: false,
      error: null,

      // Actions
      setSummary: (data: IAdminSummary) => set({ summary: data, error: null }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),
      resetAdminStore: () =>
        set({
          summary: null,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: "admin-registry-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist the summary data, not the UI states
      partialize: (state) => ({
        summary: state.summary,
      }),
    }
  )
);
