import { IRouter, Request, Response, Router } from "express";
import InfoController from "./v1/controllers/base.controller";

export default class BaseRoutes {
    public routes: IRouter;
    private _info: InfoController;
    constructor() {
        this.routes = Router();
        this._info = new InfoController();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.routes.use('/', this._info.get);
    }
}