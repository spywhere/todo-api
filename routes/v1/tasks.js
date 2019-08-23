const Router = require("@koa/router");

const KoaLink = require("../../links/koa");

module.exports = (app) => {
    const router = new Router();

    KoaLink.init(app, router).link([{
        method: "get",
        path: "/",
        controller: "tasks/task-list"
    }, {
        method: "post",
        path: "/",
        controller: "tasks/task-create"
    }, {
        method: "patch",
        path: "/:taskID",
        controller: "tasks/task-update"
    }, {
        method: "delete",
        path: "/:taskID",
        controller: "tasks/task-delete"
    }]);

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
