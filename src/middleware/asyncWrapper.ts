import { NextFunction, Request, Response } from "express";
import ErrorHandler from "./errorHandler";
import { CustomError } from "../utils/customError";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
type AsyncFunctionHandler = (...params: any) => Promise<any>;

export default class AsyncWrapper {
    wrapHandler(handler: AsyncHandler): any {
        return async function (req: Request, res: Response, next: NextFunction) {
            try {
                await handler(req, res, next);
            } catch (error: any) {
                new ErrorHandler().handleErrors(req, res, error)
            }
        }
    }
    async wrapFunction(func: AsyncFunctionHandler, args: any): Promise<any> {
        try {
            return await func(...args)
        } catch (error: any) {
            throw new CustomError(error, error.statusCode)
        }
    }
}