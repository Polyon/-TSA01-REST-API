import { NextFunction, Request } from "express";
import { BadRequest, NotFound } from "../utils/customError";

/**
 * The `RequestValidator` class is responsible for validating the request objects in an Express application.
 * It checks if the query object, params object, and body object are present and have the required properties.
 * If any of these validations fail, it throws a custom error.
 */
export default class RequestValidator {
  /**
   * Checks if the query object is present in the request and throws a `BadRequest` error if it is not.
   * It also throws a `NotFound` error if the query object is empty.
   * @param req - The Express request object
   * @param res - The Express response object
   * @param next - The Express next function
   */
  hasQueryObject(req: Request, res: Response, next: NextFunction): void {
    if (!req.query) {
      throw new BadRequest('Identifier required!');
    } else if (Object.keys(req.query).length === 0) {
      throw new NotFound('No identifier received!');
    } else {
      next();
    }
  }

  /**
   * Checks if the params object is present in the request and throws a `BadRequest` error if it is not.
   * It also throws a `NotFound` error if the params object is empty.
   * @param req - The Express request object
   * @param res - The Express response object
   * @param next - The Express next function
   */
  hasParams(req: Request, res: Response, next: NextFunction): void {
    if (!req.params) {
      throw new BadRequest('Identifier required!');
    } else if (Object.keys(req.params).length === 0) {
      throw new NotFound('No identifier received!');
    } else {
      next();
    }
  }

  /**
   * Checks if the body object is present in the request and throws a `BadRequest` error if it is not.
   * It also throws a `NotFound` error if the body object is empty.
   * @param req - The Express request object
   * @param res - The Express response object
   * @param next - The Express next function
   */
  hasBody(req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      throw new BadRequest('Operational object missing!');
    } else if (Object.keys(req.body).length === 0) {
      throw new NotFound('Operational object has no property!');
    } else {
      next();
    }
  }
}