import * as express from "express";
import logger from "morgan";
import cors from "cors";
import { ErrorStream, SuccessStream } from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import ErrorHandler from "../middleware/errorHandler";
import { serve, setup } from "swagger-ui-express";
import { apiDocument } from "../docs";
import BaseRoutes from "./api";

export default class App {
    public server: express.Express;
    private _successStream: SuccessStream;
    private _errorStream: ErrorStream;
    private _errorHandler: ErrorHandler;
    private _router: BaseRoutes;
    constructor() {
        this.server = express.default();
        this._successStream = new SuccessStream();
        this._errorStream = new ErrorStream();
        this._errorHandler = new ErrorHandler();
        this._router = new BaseRoutes();
        this.appConfig();
    }
    private appConfig(): void {
        this.server.use(logger("combined", {
            skip: this.skipError,
            stream: this._successStream
        }));
        this.server.use(logger("combined", {
            skip: this.skipSuccess,
            stream: this._errorStream
        }));
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use("/api-docs", serve, setup(apiDocument));
        this.server.use(/^\/$/, this._router.routes);
        this.server.use(this._errorHandler.routeNotExist.bind(this._errorHandler));
        this.server.use(this._errorHandler.handleErrors.bind(this._errorHandler));
    }
    private skipSuccess(req: express.Request, res: express.Response): boolean {
        return res.statusCode < StatusCodes.BAD_REQUEST;
    }
    private skipError(req: express.Request, res: express.Response): boolean {
        return res.statusCode >= StatusCodes.BAD_REQUEST;
    }
}