import mongoose from "mongoose";
import environment from "../../environments/environment.config";
import { Logger } from "../../utils/logger";
/**
 * The Database class is responsible for establishing a connection to the MongoDB database.
 */
export class Database {
    protected _connectionURI: string = '';
    protected _consoleLog: Logger;
    constructor() {
        this._consoleLog = new Logger(`MongoDb`);
    }
    /**
     * Establishes a connection to the MongoDB database.
     * @returns {void} - A promise that resolves when the connection is established successfully.
     * @throws {Error} - Throws an error if the connection cannot be established.
    */
    async MongoConnection(): Promise<void> {
        mongoose.set('strictQuery', false);
        try {
            this._connectionURI = environment.MONGO_DB_URL;
            await mongoose.connect(this._connectionURI);
            this._consoleLog.success(`Connection established!`);
        } catch (error) {
            this._consoleLog.error(`Unable to established connection!\n${error}`);
        }
    }
}