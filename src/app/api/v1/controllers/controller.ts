import { Request, Response } from "express";
import AsyncWrapper from "../../../../middleware/asyncWrapper";
import IBase from "../../../data/interfaces/IBase";
import IService from "../../../service/abstracts/service.abstract";
import { StatusCodes } from "http-status-codes";

export default class Controller<T extends IBase, S extends IService<T>>{
    private _service: S;
    private _asyncWrapper: AsyncWrapper;
    constructor(service: S) {
        this._service = service;
        this._asyncWrapper = new AsyncWrapper();
    }
    public async getDocument(req: Request, res: Response): Promise<void> {
        let doc: T = {} as T;
        if (req.params && (Object.keys(req.params).includes('_id') || Object.keys(req.params).includes('id')))
            doc = await this._asyncWrapper.wrapFunction(this._service.getDocumentById.bind(this._service), [(req.params['_id'] || req.params['id'])]);
        else if (req.params)
            doc = await this._asyncWrapper.wrapFunction(this._service.getDocument.bind(this._service), [req.params]);
        else
            doc = await this._asyncWrapper.wrapFunction(this._service.getDocument.bind(this._service), [req.query]);
        res.status(StatusCodes.OK).json({
            status: 'OK',
            error: null,
            count: 1,
            data: doc
        })
    }
    public async getDocuments(req: Request, res: Response): Promise<void> {
        let docs: T[] = [];
        docs = await this._asyncWrapper.wrapFunction(this._service.getDocuments.bind(this._service), [req.query]);
        res.status(StatusCodes.OK).json({
            status: 'OK',
            error: null,
            count: docs.length,
            data: docs
        });
    }
    public async createDocument(req: Request, res: Response): Promise<void> {
        let doc: T = {} as T;
        doc = await this._asyncWrapper.wrapFunction(this._service.createDocument.bind(this._service), [req.body.data]);
        res.status(StatusCodes.CREATED).json({
            status: 'CREATED',
            error: null,
            count: 1,
            data: doc
        });
    }
    public async updateDocument(req: Request, res: Response): Promise<void> {
        let isSuccess: boolean = false;
        if (req.params && (Object.keys(req.params).includes('_id') || Object.keys(req.params).includes('id')))
            isSuccess = await this._asyncWrapper.wrapFunction(this._service.updateDocumentById.bind(this._service), [(req.params['_id'] || req.params['id']), req.body.data]);
        else if (req.params)
            isSuccess = await this._asyncWrapper.wrapFunction(this._service.updateDocument.bind(this._service), [req.params, req.body.data]);
        else
            isSuccess = await this._asyncWrapper.wrapFunction(this._service.updateDocument.bind(this._service), [req.query, req.body.data]);
        res.status((isSuccess ? StatusCodes.OK : StatusCodes.NOT_MODIFIED)).json({
            status: (isSuccess ? 'MODIFIED' : 'NOT_MODIFIED'),
            error: null,
            updated: isSuccess
        })
    }
    public async findAndUpdateDocument(req: Request, res: Response): Promise<void> {
        let updatedDoc: T = {} as T;
        if (req.params && (Object.keys(req.params).includes('_id') || Object.keys(req.params).includes('id')))
            updatedDoc = await this._asyncWrapper.wrapFunction(this._service.findByIdAndUpdate.bind(this._service), [(req.params['_id'] || req.params['id']), req.body.data]);
        else if (req.params)
            updatedDoc = await this._asyncWrapper.wrapFunction(this._service.findAndUpdate.bind(this._service), [req.params, req.body.data]);
        else
            updatedDoc = await this._asyncWrapper.wrapFunction(this._service.findAndUpdate.bind(this._service), [req.query, req.body.data]);
        res.status(StatusCodes.OK).json({
            status: 'OK',
            error: null,
            count: 1,
            data: updatedDoc
        });
    }
    public async deleteDocument(req: Request, res: Response): Promise<void> {
        let isSuccess: boolean = false;
        if (req.params && (Object.keys(req.params).includes('_id') || Object.keys(req.params).includes('id')))
            isSuccess = await this._asyncWrapper.wrapFunction(this._service.deleteDocumentById.bind(this._service), [(req.params['_id'] || req.params['id'])]);
        else if (req.params)
            isSuccess = await this._asyncWrapper.wrapFunction(this._service.deleteDocument.bind(this._service), [req.params]);
        else
            isSuccess = await this._asyncWrapper.wrapFunction(this._service.deleteDocument.bind(this._service), [req.query]);
        res.status((isSuccess ? StatusCodes.GONE : StatusCodes.NOT_MODIFIED)).json({
            status: (isSuccess ? 'DELETED' : 'NOT_MODIFIED'),
            error: null,
            deleted: isSuccess
        })
    }
}