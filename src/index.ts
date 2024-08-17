import App from "./app/app";
import { Database } from "./app/data/connection.mongo";
import environment from "./environments/environment.config";
import { Logger } from "./utils/logger";

(async function(){
    const log:Logger=new Logger(`APP`);
    try {
        const db:Database=new Database();
        const app:App=new App();
        await db.MongoConnection();
        app.server.listen(environment.PORT,() => {
            log.info(`${environment.API_ENV} Server is running on http://127.0.0.1:${environment.PORT}`);
        });
    } catch (error:any) {
        log.error(`Unable to start server\n${error.message}`);
        process.exit(1);
    }
})();