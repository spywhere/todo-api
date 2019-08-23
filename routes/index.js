const Router = require("@koa/router");

module.exports = (app) => {
    const router = new Router();

    // Simple health check endpoint
    router.get("/", async(context) => {
        context.status = 200;
        context.body = {
            timestamp: new Date()
        };
    });

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
