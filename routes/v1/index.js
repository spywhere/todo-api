const Router = require("@koa/router");

const tasks = require("./tasks");

module.exports = (app) => {
    const router = new Router();

    router.use("/tasks", ...tasks(app));

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
