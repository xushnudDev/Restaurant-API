import { BaseException } from "../exceptions/base.exception.js";

export const RolesMiddeleware = (...roles) => {
    return (request, _, next) => {
        const userRole = request.role
        if (!request.role) {
            throw new BaseException("Access token is missing", 401);
        }
        if (!roles.includes(userRole)) {
            throw new BaseException("Unauthorized", 403);
        }
        next();
    }
}