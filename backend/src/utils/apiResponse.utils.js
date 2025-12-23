/**
 * @class ApiResponse
 * @description Standerized response structure for all Successful API calls
 */
export class ApiResponse {

    /**
     * 
     * @param {number} statusCode- HTTP Status Code
     * @param {string} message - brief Success message to send to the client
     * @param {*} data - The payload to send to the client

     */

    constructor(statusCode=200,message="Success",data=null) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = true
        this.errors = [] // to maintain consistent response structure
    }
}