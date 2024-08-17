import * as devEnv from "../environments/development.env";
import * as prodEnv from "../environments/production.env";
import * as testEnv from "../environments/test.env";

export const apiDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: '[DOCUMENT] MENT',
        description: 'A backend api documentation',
        contact: {
            name: '<contact name>',
            email: '<contact email>',
        }
    },
    servers: [
        {
            url: `${devEnv.default.HOST_IP}:${devEnv.default.PORT}`,
            description: "Development Server"
        },
        {
            url: `${prodEnv.default.HOST_IP}:${prodEnv.default.PORT}`,
            description: "Production Server"
        },
        {
            url: `${testEnv.default.HOST_IP}:${testEnv.default.PORT}`,
            description: "Test Server"
        }
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    security: [{
        BearerAuth: [
            {
                in: "header",
                name: "Authorization",
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        ]
    }],
    paths: {},
    components: {
        securitySchemes: {
            BearerAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }

        }
    }
}