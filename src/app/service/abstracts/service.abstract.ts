import { Document, FilterQuery, UpdateQuery } from "mongoose";

export default abstract class IService<T extends Document>{
    /**
     * Get a document from mongoose collection
     * @param {string} id mongoose object id
     * @requires id
     * @returns {T} the document's object with that id
     */
    abstract getDocumentById(id: string): Promise<T>;
    /**
     * Get a document from mongoose collection
     * @param {FilterQuery<T>} filter mongoose filter query
     * @requires filter
     * @returns {T} the document's object based on requirements
     * @example
     * let filter = {_id: req.params.id}
     * return await getDocument(filter)
     */
    abstract getDocument(filter: FilterQuery<T>): Promise<T>;
    /**
     * Get list of Documents from mongoose collection
     * @param {FilterQuery<T>} filter mongoose filter query
     * @returns {T[]} the list of documents based on the query match
     * @example
     * let filter = {_id: req.params.id}
     * return await getDocuments(filter)
     */
    abstract getDocuments(filter?: FilterQuery<T>): Promise<T[]>;
    /**
     * Insert a new document to mongoose collection
     * @param {T} rawDoc new document object
     * @requires rawDoc
     * @returns {T} newly inserted document from mongoose collection
     */
    abstract createDocument(rawDoc: T): Promise<T>;
    /**
     * Update an existing document in mongoose collection
     * @requires
     * @param {FilterQuery<T>} filter mongoose query for find the document
     * @requires
     * @param {UpdateQuery<T>} update document object with updating field value
     * @returns {boolean} true if update successful else false
     */
    abstract updateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<boolean>;
    /**
     * Update an existing document in mongoose collection
     * @requires
     * @param {string} id document id
     * @param {UpdateQuery<T>} update document object with updating field value
     * @returns {boolean} true if update successful else false
     */
    abstract updateDocumentById(id: string, update: UpdateQuery<T>): Promise<boolean>;
    /**
     * Update an existing document in mongoose collection
     * @requires
     * @param {string} id document id
     * @param {UpdateQuery<T>} update document object with updating field value
     * @returns {T} updated document from collection
     */
    abstract findByIdAndUpdate(id: string, update: UpdateQuery<T>): Promise<T>;
    /**
     * Update an existing document in mongoose collection
     * @param {FilterQuery<T>} filter mongoose query for find the document
     * @param {UpdateQuery<T>} update document object with updating field value
     * @returns {T} updated document from collection
     */
    abstract findAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T>;

    /**
     * Delete an existing document in mongoose collection
     * @requires
     * @param {FilterQuery<T>} filter mongoose query for find the document
     * @returns {boolean} true if delete successful else false
     */
    abstract deleteDocument(filter: FilterQuery<T>): Promise<boolean>;
    /**
     * Delete an existing document in mongoose collection
     * @requires
     * @param {string} id document id
     * @returns {boolean} true if delete successful else false
     */
    abstract deleteDocumentById(id: string): Promise<boolean>;
}