import { Document, FilterQuery, UpdateQuery } from "mongoose";
import IService from "./abstracts/service.abstract";
import IRepository from "../data/repositories/abstracts/repository.abstract";
import validObjectId from "../../utils/objectIdValidator";
import { BadRequest, NotFound } from "../../utils/customError";

export default class Service<T extends Document, R extends IRepository<T>> implements IService<T>{
    private _repository: R;
    constructor(repository: R) {
        this._repository = repository;
    }
    async getDocumentById(id: string): Promise<T> {
        let doc: T = {} as T;
        await validObjectId(id);
        doc = await this._repository.getDocument(id);
        if (Object.keys(doc).length == 0)
            throw new NotFound(`No document found with ID ${id}`);
        return doc;
    }
    async getDocument(filter: FilterQuery<T>): Promise<T> {
        let doc: T = {} as T;
        doc = await this._repository.getDocument(filter);
        if (Object.keys(doc).length == 0)
            throw new NotFound(`No document found`);
        return doc;
    }
    async getDocuments(filter?: FilterQuery<T>): Promise<T[]> {
        let docs: T[] = [];
        if (filter && Object.keys(filter).includes(`_id`))
            await validObjectId(filter._id);
        docs = await this._repository.getDocuments(filter || {});
        return docs;
    }
    async createDocument(rawDoc: T): Promise<T> {
        let doc: T = {} as T;
        doc = await this._repository.createDocument(rawDoc);
        if (Object.keys(doc).length == 0)
            throw new BadRequest(`Unable to create new document`);
        return doc;
    }
    async updateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<boolean> {
        let isUpdate: boolean = false;
        if (filter && filter._id)
            await validObjectId(filter._id);
        isUpdate = await this._repository.updateDocument(filter, update);
        return isUpdate;
    }
    async updateDocumentById(id: string, update: UpdateQuery<T>): Promise<boolean> {
        let isUpdate: boolean = false;
        await validObjectId(id);
        isUpdate = await this._repository.updateDocument(id, update);
        return isUpdate;
    }
    async findByIdAndUpdate(id: string, update: UpdateQuery<T>): Promise<T> {
        let updatedDoc: T = {} as T;
        await validObjectId(id);
        updatedDoc = await this._repository.findAndUpdateDocument(id, update);
        return updatedDoc;
    }
    async findAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
        let updatedDoc: T = {} as T;
        if (filter && filter._id)
            await validObjectId(filter._id);
        updatedDoc = await this._repository.findAndUpdateDocument(filter, update);
        return updatedDoc;
    }
    async deleteDocument(filter: FilterQuery<T>): Promise<boolean> {
        let isDelete: boolean = false;
        if (filter && filter._id)
            await validObjectId(filter._id);
        isDelete = await this._repository.deleteDocument(filter);
        return isDelete;
    }
    async deleteDocumentById(id: string): Promise<boolean> {
        let isDelete: boolean = false;
        await validObjectId(id);
        isDelete = await this._repository.deleteDocument(id);
        return isDelete;
    }
}