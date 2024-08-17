import { Document, FilterQuery, UpdateQuery } from "mongoose";

/**
 * An abstract class that defines the interface for a repository to perform CRUD operations on a MongoDB collection.
 * @typeparam T - The type of the document.
 */
export default abstract class IRepository<T extends Document>{
    /** 
     * Get a document from mongoose collection 
     * @param {string} id mongoose object id 
     * @requires id 
     * @returns {T} the document's object with that id 
     */
    abstract getDocument(id: string): Promise<T>;
    
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
     * @returns {T} the list of documents based on the query match 
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
     * Insert an array of new document to mongoose collection 
     * @param {T[]} rawDocs new document object array
     * @requires rawDocs 
     * @returns {T[]} newly inserted documents from mongoose collection 
     */
    abstract createDocuments(rawDocs: T[]): Promise<T[]>;

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
     * @returns true if update successful else false 
     */
    abstract updateDocument(id: string, update: UpdateQuery<T>): Promise<boolean>;

    /**
     * Update an existing document in mongoose collection 
     * @requires
     * @param {FilterQuery<T>} filter mongoose query for find the document 
     * @param {UpdateQuery<T>} update document object with updating field value 
     * @returns {T} updated document from collection
     */
    abstract findAndUpdateDocument(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T>;
    /**
     * Update an existing document in mongoose collection by their ID
     * @param {string} id document id
     * @param {UpdateQuery<T>} update document object with updating field value 
     * @returns {T} updated document from collection
     */
    abstract findAndUpdateDocument(id: string, update: UpdateQuery<T>): Promise<T>;
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
    abstract deleteDocument(id: string): Promise<boolean>;
}