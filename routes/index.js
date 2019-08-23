const Router = require("@koa/router");

const v1 = require("./v1");

module.exports = (app) => {
    const router = new Router();

    // Simple health check endpoint
    router.get("/", async(context) => {
        context.status = 200;
        context.body = {
            timestamp: new Date()
        };
    });

    router.use("/v1", ...v1(app));

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
