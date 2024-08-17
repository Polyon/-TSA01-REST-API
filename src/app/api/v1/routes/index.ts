import { IRouter, Router } from "express";
import AsyncWrapper from "../../../../middleware/asyncWrapper";

export default class APIRoutes {
    private _routes: IRouter;
    private _asyncWrapper: AsyncWrapper;
    constructor() {
        this._routes = Router();
        this._asyncWrapper = new AsyncWrapper();
        this.initializeRoutes();
    }
    public initializeRoutes(): void {
    }
}