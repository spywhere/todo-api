const Router = require("@koa/router");

const tasks = require("./tasks");
const authentications = require("./authentications");

module.exports = (app) => {
    const router = new Router();

    router.use("/tasks", ...tasks(app));
    router.use("/authentications", ...authentications(app));

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
