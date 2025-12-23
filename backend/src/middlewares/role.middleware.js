import { User } from "../models/User.js"
import { ApiError } from "../utils/apiError.utils.js"

/**
 * @description HOF(higher order function) to genereate role checking middleware
 * @param{Array<string>} allowRoles - list of allowed roles. for ex: ['admin','user',"manager"]
 * @returns(function) Express middleware (req,res,next)=>{}
 */
const hasRole = (requiredRole)=> (req,res,next)=>{

    if(!req.user || !req.user.role) {
        throw new ApiError(401,"Unauthorized",["Authentication required before authoization check"])
    }

    const userRole = req.user.role

    if(!requiredRole.includes(userRole)) {
        throw new ApiError(403,`Access forbidden for role: ${userRole} is not permitted to access this resource` )
    }

    next()
}

hasRole.ROLES = User.ROLES

export {hasRole}