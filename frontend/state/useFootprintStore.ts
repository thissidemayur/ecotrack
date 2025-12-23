// @/state/useFootprintStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ICarbpnCalculationData,
  IMonthlyFootprintAnalytics,
} from "@/types/footprintApi.type";

interface FootprintState {
  lastResult: ICarbpnCalculationData | null;
  allResults: ICarbpnCalculationData[];
  analytics: IMonthlyFootprintAnalytics[];
  isLoading: boolean;
  // Actions
  setLoading: (loading: boolean) => void;
  setDashboardData: (
    history: ICarbpnCalculationData[],
    analytics: IMonthlyFootprintAnalytics[]
  ) => void;
  setLastResult: (result: ICarbpnCalculationData | null) => void;
  resetStore: () => void;
}

export const useFootprintStore = create<FootprintState>()(
  persist(
    (set) => ({
      lastResult: null,
      allResults: [],
      analytics: [],
      isLoading: false,

      setLoading: (loading) => set({ isLoading: loading }),

      setDashboardData: (allResults, analytics) =>
        set({ allResults, analytics, isLoading: false }),

      setLastResult: (result) => set({ lastResult: result }),

      resetStore: () =>
        set({
          lastResult: null,
          allResults: [],
          analytics: [],
          isLoading: false,
        }),
    }),
    {
      name: "ecotrack-result-storage",
      partialize: (state) => ({
        allResults: state.allResults,
        analytics: state.analytics,
        lastResult: state.lastResult,
      }),
    }
  )
);
