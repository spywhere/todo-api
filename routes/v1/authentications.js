const Router = require("@koa/router");

const KoaLink = require("../../links/koa");

module.exports = (app) => {
    const router = new Router();

    KoaLink.init(app, router).link([{
        method: "post",
        path: "/login",
        controller: "authentications/login"
    }]);

    return [
        router.routes(),
        router.allowedMethods()
    ];
};
