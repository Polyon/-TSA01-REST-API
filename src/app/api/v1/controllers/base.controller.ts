import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default class InfoController {
    async get(req: Request, res: Response): Promise<void> {
        let message: string = `MENT Template`;
        res.status(StatusCodes.OK).send(message)
    }
}