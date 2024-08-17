import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/**
 * The `ErrorHandler` class is responsible for handling errors in an Express application.
 * It provides methods to handle general errors and route not found errors.
 */
export default class ErrorHandler {
public static instance: ErrorHandler;
  private _customError: CustomError;

  /**
   * Creates an instance of `ErrorHandler`.
   */
  constructor() {
ErrorHandler.instance = this;
    this._customError = {
      name: `Internal server error`,
      message: `Something went wrong!`,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    };
  }

  /**
   * Handles general errors in an Express application.
   * @param req - The request object.
   * @param res - The response object.
   * @param error - The error object.
   * @returns The response with the error details.
   */
  handleErrors(req: Request, res: Response, error: any): Response {
    this._customError = {
      name: error.name || this._customError.name,
      message: error.message || this._customError.message,
      statusCode: error.statusCode || this._customError.statusCode
    };
    return res.status(this._customError.statusCode).json({
      name: this._customError.name,
      message: this._customError.message
    });
  }

  /**
   * Handles route not found errors in an Express application.
   * @param req - The request object.
   * @param res - The response object.
   */
  routeNotExist(req: Request, res: Response): void {
    this._customError = {
      name: `RouteNotExist`,
      message: `${req.method} ${req.originalUrl} doesn't exist!`,
      statusCode: StatusCodes.NOT_FOUND
    };
    res.status(this._customError.statusCode).json({
      name: this._customError.name,
      message: this._customError.message
    });
  }
}

interface CustomError {
    name: string,
    message: string,
    statusCode: number
}