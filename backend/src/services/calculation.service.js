// /services/calculation.service.js (CORRECTED)

import { ApiError } from "../utils/apiError.utils.js";

/**
 * @class CalculationService
 * @description The core engine responsible for calculating the household carbon footprint (CFP).
 * The formula used is: CFP = Sum(Activity Data * Emission Factor).
 */
class CalculationService {
  /**
   * @private
   * @description Helper method to safely look up and retrieve a specific emission factor value.
   * @param {Array<Object>} factors - The array of EmissionFactor objects.
   * @param {string} factorId - The unique ID of the factor to find (e.g., 'electricity_kwh').
   * @returns {number} - The emission factor value, or 0 if not found.
   */
  _getFactorValue(factors, factorId) {
    const factor = factors.find((f) => f.factorId === factorId);
    if (!factor) {
      console.warn(`Missing emission factor: ${factorId}. Using zero.`);
      return 0;
    }
    return factor.value;
  }

  /**
   * @description Calculates the total and categorized carbon footprint.
   * @param {Object} activityData - Validated user input data (kWh, km, spend, kg).
   * @param {Array<Object>} factors - Array of EmissionFactor documents from the DB.
   * @returns {Object} - Contains total_co2e and breakdown_co2e.
   */
  calculate(activityData, factors) {
    if (!factors || factors.length === 0) {
      // This is a critical error: cannot calculate without factors
      throw new ApiError(
        500,
        "Calculation failed: Emission factors are not available."
      );
    }
    //

    const breakdown_co2e = {
      energy: 0,
      transport: 0,
      consumption: 0,
      waste: 0,
    };
    let total_co2e = 0;

    // Ensure the version is captured for logging purposes
    const factorVersion = factors.length > 0 ? factors[0].version : "N/A";

    // --- 1. Home Energy Calculation ---
    if (activityData.energy) {
      const { electricity_kwh, natural_gas_kwh } = activityData.energy;
      let category_co2e = 0;

      // Electricity
      // FIX: Using the registered factorId: 'electricity_kwh'
      const elec_factor = this._getFactorValue(factors, "electricity_kwh");
      if (electricity_kwh > 0) {
        category_co2e += electricity_kwh * elec_factor;
      }

      // Natural Gas
      const gas_factor = this._getFactorValue(factors, "natural_gas_kwh");
      if (natural_gas_kwh > 0) {
        category_co2e += natural_gas_kwh * gas_factor;
      }

      breakdown_co2e.energy = parseFloat(category_co2e.toFixed(2));
      total_co2e += category_co2e;
    }

    // --- 2. Transport Calculation ---
    if (activityData.transport) {
      const { car_km_petrol, car_km_diesel, public_bus_km, flight_km_short } =
        activityData.transport;
      let category_co2e = 0;

      // Petrol Car Travel
      // FIX: Using the registered factorId: 'car_km_petrol'
      const petrol_factor = this._getFactorValue(factors, "car_km_petrol");
      if (car_km_petrol > 0) {
        category_co2e += car_km_petrol * petrol_factor;
      }

      // Diesel Car Travel
      const diesel_factor = this._getFactorValue(factors, "car_km_diesel");
      if (car_km_diesel > 0) {
        category_co2e += car_km_diesel * diesel_factor;
      }

      // Public Bus
      const bus_factor = this._getFactorValue(factors, "public_bus_km");
      if (public_bus_km > 0) {
        category_co2e += public_bus_km * bus_factor;
      }

      // FIX: ADDED Missing flight calculation
      const flight_factor = this._getFactorValue(factors, "flight_km_short");
      if (flight_km_short > 0) {
        category_co2e += flight_km_short * flight_factor;
      }

      breakdown_co2e.transport = parseFloat(category_co2e.toFixed(2));
      total_co2e += category_co2e;
    }

    // --- 3. Consumption Calculation (Spend-Based) ---
    if (activityData.consumption) {
      // FIX: Added food_veg_spend_currency
      const {
        food_meat_spend_currency,
        clothing_spend_currency,
        food_veg_spend_currency,
      } = activityData.consumption;
      let category_co2e = 0;

      // Meat Spend
      // FIX: Using the registered factorId: 'food_meat_spend_currency'
      const meat_factor = this._getFactorValue(
        factors,
        "food_meat_spend_currency"
      );
      if (food_meat_spend_currency > 0) {
        category_co2e += food_meat_spend_currency * meat_factor;
      }

      // FIX: ADDED Vegetable Spend
      const veg_factor = this._getFactorValue(
        factors,
        "food_veg_spend_currency"
      );
      if (food_veg_spend_currency > 0) {
        category_co2e += food_veg_spend_currency * veg_factor;
      }

      // Clothing Spend
      const clothing_factor = this._getFactorValue(
        factors,
        "clothing_spend_currency"
      );
      if (clothing_spend_currency > 0) {
        category_co2e += clothing_spend_currency * clothing_factor;
      }

      breakdown_co2e.consumption = parseFloat(category_co2e.toFixed(2));
      total_co2e += category_co2e;
    }

    // --- 4. Waste Calculation ---
    if (activityData.waste) {
      const { waste_landfilled_kg, waste_recycled_kg } = activityData.waste;
      let category_co2e = 0;

      // Landfilled Waste
      const landfill_factor = this._getFactorValue(
        factors,
        "waste_landfilled_kg"
      );
      if (waste_landfilled_kg > 0) {
        // No factor value check needed, just input
        category_co2e += waste_landfilled_kg * landfill_factor;
      }

      // Recycled Waste (Credit)
      const recycled_factor = this._getFactorValue(
        factors,
        "waste_recycled_kg"
      );
      // FIX: Removed the '&& recycled_factor > 0' check.
      // Allows positive or negative factors (credits) to be applied.
      if (waste_recycled_kg > 0) {
        category_co2e += waste_recycled_kg * recycled_factor;
      }

      breakdown_co2e.waste = parseFloat(category_co2e.toFixed(2));
      total_co2e += category_co2e;
    }

    // Return the final structured data
    return {
      total_co2e: parseFloat(total_co2e.toFixed(2)),
      breakdown_co2e,
      emissionFactorVersion: factorVersion,
    };
  }
}

export const calculationService = new CalculationService();
