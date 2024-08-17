import { Document, FilterQuery, Model, PopulateOption, QueryOptions, UpdateAggregationStage, UpdateQuery } from "mongoose";
/** 
 * A package that execute mongoose query for Create, Retrieve, Update and Delete 
 */
export namespace QueryBuilder {
    /** 
     * A generic class that executes queries on a Mongoose collection.
     * @template T The type of the documents in the collection.
     */
    export class Executable<T extends Document>{
        private _dbCollection: Model<T>;
        /**
         * Creates an instance of the Executable class.
         * @param collection The Mongoose model representing the collection.
         */
        constructor(collection: Model<T>) {
            this._dbCollection = collection;
        }
        /**
         * Retrieves all documents from the collection based on the provided filter and options.
         * @param filter The filter query.
         * @param options The query options.
         * @returns A promise that resolves to an array of documents.
         */
        async getDocuments(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T[]> {
            let docs: T[] = [];
            docs = await this._dbCollection.find(filter || {}, null, options);
            return docs;
        }
        /**
         * Retrieves a single document from the collection based on the provided filter and options.
         * @param filter The filter query.
         * @param options The query options.
         * @returns A promise that resolves to a document.
         */
        async getDocument(filter?: FilterQuery<T>, options?: QueryOptions<T>): Promise<T> {
            let doc: T = {} as T;
            const resultDoc = await this._dbCollection.findOne(filter, null, options);
            doc = resultDoc?.toObject() as T;
            return doc;
        }
        /**
         * Creates a new document in the collection with the provided data.
         * @param rawDoc The document to be created.
         * @param options The query options.
         * @returns A promise that resolves to the newly created document.
         */
        async createDocument(rawDoc: T, options?: QueryOptions<T>): Promise<T> {
            let newDoc: T = {} as T;
            newDoc = await this._dbCollection.create(rawDoc);
            if (options?.populate)
                newDoc = await newDoc.populate(options.populate);
            return newDoc;
        }
        /**
         * Creates multiple documents in the collection with the provided data.
         * @param rawDocs The array of documents to be created.
         * @param options The query options.
         * @returns A promise that resolves to the newly created documents.
         */
        async createDocuments(rawDocs: T[], options?: QueryOptions<T>): Promise<any> {
            let newDocs: any[] = [];
            newDocs = await this._dbCollection.insertMany(rawDocs, { populate: options?.populate });
            return newDocs;
        }
        /**
         * Updates a single document in the collection based on the provided filter and update data.
         * @param filter The filter query.
         * @param update The update data.
         * @returns A promise that resolves to the update result.
         */
        async updateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<any> {
            let result: any = {};
            result = await this._dbCollection.updateOne(filter, update);
            return result;
        }
        /**
         * Updates multiple documents in the collection based on the provided filter and update data.
         * @param filter The filter query.
         * @param update The update data.
         * @returns A promise that resolves to the update result.
         */
        async updateDocuments(filter: FilterQuery<T>, update: UpdateQuery<T> | UpdateAggregationStage[]): Promise<any> {
            let result: any = {};
            result = await this._dbCollection.updateMany(filter, update);
            return result;
        }
        /**
         * Finds a document in the collection based on the provided filter, updates it with the provided data, and returns the updated document.
         * @param filter The filter query.
         * @param update The update data.
         * @returns A promise that resolves to the updated document.
         */
        async findAndUpdateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<any> {
            let result: any = {};
            result = await this._dbCollection.findOneAndUpdate(filter, update, { new: true });
            return result;
        }
        /**
         * Deletes a single document from the collection based on the provided filter.
         * @param filter The filter query.
         * @returns A promise that resolves to the delete result.
         */
        async deleteDocument(filter: FilterQuery<T>): Promise<any> {
            let result: any = {};
            result = await this._dbCollection.deleteOne(filter);
            return result;
        }
        /**
         * Deletes multiple documents from the collection based on the provided filter.
         * @param filter The filter query.
         * @returns A promise that resolves to the delete result.
         */
        async deleteDocuments(filter: FilterQuery<T>): Promise<any> {
            let result: any = {};
            result = await this._dbCollection.deleteMany(filter);
            return result;
        }
    }
}
