import { Document, SchemaTimestampsConfig } from "mongoose";

/**
 * Represents an interface for a base document in MongoDB.
 */
export default interface IBase extends Document, SchemaTimestampsConfig { }