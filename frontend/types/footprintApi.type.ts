// export
export interface IFootprintBreakdown {
  energy: number;
  transport: number;
  consumption: number;
  waste: number;
}

export interface ICarbpnCalculationData {
  id: string;
  period: string;
  dateCalculated: string;
  results: {
    total_co2e: number;
    breakdown_co2e: IFootprintBreakdown;
  };
}

export interface IMonthlyFootprintAnalytics {
  month: string;
  totalEmissions: number;
  count: number;
  avgEmissions: number;
}