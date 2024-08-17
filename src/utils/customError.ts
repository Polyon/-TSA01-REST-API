import { StatusCodes } from "http-status-codes";
/** 
 * A custom error class that extends the built-in Error class.
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code associated with the error.
 */
class Base extends Error {
    public statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * A class that handles different types of errors and returns the appropriate error object based on the given error and status code.
 */
export class CustomError {
    /**
     * Constructs a new CustomError instance.
     * @param {any} error - The generated error object.
     * @param {number | undefined} statusCode - The HTTP status code associated with the error.
     * @returns {BadRequest | NotFound | Base} - The appropriate error object based on the given error and status code.
     */
    constructor(error: any, statusCode?: number) {
        if (error.name === "ValidationError")
            return new BadRequest(error.message);
        else if (error.code && error.code === 11000)
            return new BadRequest(`Duplicate value entered for ${Object.keys(error.keyValue)} field!`);
        else if (error.name === "CastError")
            return new NotFound(`No item found with ${error.value}`);
        else
            return new Base(error.message, statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
/** 
 * A class that set for handle Bad Request error 
 * @param { string } message custom massage that show to client 
 */
export class BadRequest extends Base {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}
/** 
 * A class that set for handle Not Found error 
 * @param { string } message custom massage that show to client 
 */
export class NotFound extends Base {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}
/** 
 * A class that set for handle Unauthorized error 
 * @param { string } message custom massage that show to client 
 */
export class Unauthorized extends Base {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}
/** 
 * A class that set for handle Forbidden error 
 * @param { string } message custom massage that show to client 
 */
export class Forbidden extends Base {
    constructor(message: string) {
        super(message, StatusCodes.FORBIDDEN);
    }
}