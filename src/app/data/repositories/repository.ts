import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { QueryBuilder } from "../../../utils/queryBuilder";
import IRepository from "./abstracts/repository.abstract";
import { BadRequest, NotFound } from "../../../utils/customError";

/**
 * A generic repository class that provides CRUD operations for a MongoDB collection.
 * @typeparam T - The type of the document.
 */
export default class Repository<T extends Document> implements IRepository<T>{
    private _collection: Model<T>;
    private _queryOptions: QueryOptions<T>;
    private _queryBuilder: QueryBuilder.Executable<T>;
    /**
     * The constructor initializes a QueryBuilder object with a collection and optional query options.
     * @param {Model<T>} collection - The `collection` parameter is an instance of the `Model` class
     * @param {QueryOptions<T>} queryOptions - The queryOptions parameter is an optional object that allows you to
     * specify additional options for the query. 
     */
    constructor(collection: Model<T>, queryOptions?: QueryOptions<T>) {
        this._collection = collection;
        this._queryOptions = queryOptions || {} as QueryOptions<T>;
        this._queryBuilder = new QueryBuilder.Executable<T>(this._collection);
    }
    getDocument(id: string): Promise<T>;
    getDocument(filter: FilterQuery<T>): Promise<T>;
    async getDocument(filter: string | FilterQuery<T>): Promise<T> {
        let doc: T = {} as T;
        if (typeof filter === "string")
            doc = await this._queryBuilder.getDocument({ _id: filter }, this._queryOptions) || {} as T;
        else {
            doc = await this._queryBuilder.getDocument(filter, this._queryOptions) || {} as T;
        }
        return doc;
    }
    async getDocuments(filter?: FilterQuery<T>): Promise<T[]> {
        let doc: T[] = [];
        doc = await this._queryBuilder.getDocuments(filter, this._queryOptions);
        return doc;
    }
    async createDocument(rawDoc: T): Promise<T> {
        let doc: T = {} as T;
        doc = await this._queryBuilder.createDocument(rawDoc, this._queryOptions);
        return doc;
    }
    async createDocuments(rawDocs: T[]): Promise<T[]> {
        let docs:T[]=[];
        docs=await this._queryBuilder.createDocuments(rawDocs, this._queryOptions);
        return docs;    
    }
    updateDocument(id: string, update: UpdateQuery<T>): Promise<boolean>;
    updateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<boolean>;
    async updateDocument(filter: string | FilterQuery<T>, update: UpdateQuery<T>): Promise<boolean> {
        let isUpdate: any = {};
        if (typeof filter === 'string')
            isUpdate = await this._queryBuilder.updateDocument({ _id: filter }, update);
        else
            isUpdate = await this._queryBuilder.updateDocument(filter, update);
        if (isUpdate.matchedCount == 0)
            throw new NotFound("No document found to update!");
        else
            if (isUpdate.modifiedCount == 0)
                throw new BadRequest("Unable to update document!");
        return true;
    }
    findAndUpdateDocument(id: string, update: UpdateQuery<T>): Promise<T>
    findAndUpdateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T>
    async findAndUpdateDocument(filter: string | FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
        let doc: T = {} as T;
        if (typeof filter === 'string')
            doc = await this._queryBuilder.findAndUpdateDocument({ _id: filter }, update);
        else
            doc = await this._queryBuilder.findAndUpdateDocument(filter, update);
        return doc
    }
    deleteDocument(id: string): Promise<boolean>;
    deleteDocument(filter: FilterQuery<T>): Promise<boolean>;
    async deleteDocument(filter: string | FilterQuery<T>): Promise<boolean> {
        let isDeleted: any = {};
        if (typeof filter === "string")
            isDeleted = await this._queryBuilder.deleteDocument({ _id: filter });
        else
            isDeleted = await this._queryBuilder.deleteDocument(filter);
        return isDeleted.deletedCount == 1 ? true : false;
    }
}

