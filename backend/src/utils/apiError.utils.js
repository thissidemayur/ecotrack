/**
 * @class ApiError
 * @extends Error
 * @description Custom error class for standerized API error response
 */
export class ApiError extends Error {

    /**
     * @param {number} statusCode - HTTP Status Code
     * @param {string} message - Error message to send to the client
     * @param {Array<string>} error - An array of specifc error details(optional, for validation)
     * @param {string} stack - stack trace (optional, used in non-production environments)
     */

    constructor(statusCode,message="Something went wrong",error =[],stack="") {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        this.success = false
        this.data = null // to maintain consistent response structure
        this.isOperational = true // to differentiate between operational errors(user mistakes , expected errors,db error) and programming errors(code bugs)
        if (stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}