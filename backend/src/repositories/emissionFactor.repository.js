// Will handle CRUD operations for the EmissionFactor model:Reterievel-fetching all current factor for calculation , management-CRUD factor(admin)// /repositories/emissionFactor.repository.js

import { EmissionFactor } from '../models/EmissionFactor.js';

/**
 * @class EmissionFactorRepository
 * @description Provides database abstraction for the EmissionFactor model.
 */
class EmissionFactorRepository {

    /**
     * @description Fetches all active emission factors used for carbon calculation.
     * @returns {Promise<Array<EmissionFactor>>} - Returns an array of EmissionFactor documents.
     */
    async getAllActiveFactors() {
        // Find all factors. In a production environment, you might filter by a 'isActive: true' flag.
        return await EmissionFactor.find({});
    }

    /**
     * @description Fetches a single emission factor by its unique ID.
     * @param {string} factorId - The unique identifier of the factor.
     * @returns {Promise<EmissionFactor|null>} - Returns the factor document or null if not found.
     */
    async findById(factorId) {
        return await EmissionFactor.findOne({ factorId });
    }

    /**
     * @description Creates a new emission factor document.
     * @param {Object} factorData - Data for the new factor (factorId, value, unit, source, etc.).
     * @returns {Promise<EmissionFactor>} - Returns the newly created factor document.
     */
    async createFactor(factorData) {
        return await EmissionFactor.create(factorData);
    }

    /**
     * @description Updates an existing emission factor by ID.
     * @param {string} factorId - The unique identifier of the factor to update.
     * @param {Object} updateData - Fields and values to update.
     * @returns {Promise<EmissionFactor|null>} - Returns the updated factor document or null.
     */
    async updateFactor(factorId, updateData) {
        return await EmissionFactor.findOneAndUpdate(
            { factorId },
            { $set: updateData },
            { new: true, runValidators: true } // Return the updated document and run Mongoose validation
        );
    }

    /**
     * @description Deletes an emission factor by ID.
     * @param {string} factorId - The unique identifier of the factor to delete.
     * @returns {Promise<boolean>} - True if deletion was successful, false otherwise.
     */
    async deleteFactor(factorId) {
        const result = await EmissionFactor.deleteOne({ factorId });
        return result.deletedCount === 1;
    }
}

export const emissionFactorRepository = new EmissionFactorRepository();