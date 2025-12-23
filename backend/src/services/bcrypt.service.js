import bcrypt from "bcryptjs"
import { config } from "../config/index.js"
import { ApiError } from "../utils/apiError.utils.js";


class BcryptService {
    constructor() {
        this.saltRounds = config.BCRYPT_SALT_ROUNDS;
        if (this.saltRounds <10) {
            console.warn(`[SECURITY WARNING] BCRYPT_SALT_ROUNDS is set to a low value of ${this.saltRounds}. It is recommended to use at least 10 rounds for better security.`)
        }
    }

    /**
     * @description hash any plain string text
     * @params {string} text
     * @returns {Promise<string>}- hashed string
     */
    async hash(plainText) {
        if (!plainText) {
            throw new ApiError(400,`Field cannot be empty`)
        }
        try {
            return await bcrypt.hash(plainText,this.saltRounds)
            
        } catch (error) {
            console.error("Bcrypt Hashing failed: ", error);
            throw new ApiError(500, "Internal Server Error", [
              `Failed to securely hash field.`,
            ]);
        }
    }

    /**
     * @description compare plain text with hashed string
     * @params {string} plainText - the text to compare
     * @params {string} hashedText - the stored hashed text
     * @returns {Promise<boolean>} - true if match, false otherwise
     */
    async compare(plainText,hashedText){
        if (!plainText || !hashedText) {
            return false
        }

        try {
            return await bcrypt.compare(plainText, hashedText)
        } catch (error) {
            console.error("Bcrypt Comparison failed: ", error);
            return false
        }
        
    }
}

export const bcryptService = new BcryptService();