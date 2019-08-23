const Router = require("@koa/router");

const KoaLink = require("../../links/koa");

module.exports = (app) => {
    const router = new Router();

    KoaLink.init(app, router).link([{
        method: "get",
        path: "/",
        controller: "tasks/task-list"
    }])

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
