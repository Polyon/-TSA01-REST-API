import { config } from "dotenv";

type Environment = { [key: string]: any }
config();
const environment: Environment = require(`./${process.env.NODE_ENV || "development"}.env`).default;
export default environment;