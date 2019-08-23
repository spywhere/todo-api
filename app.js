const Koa = require("koa");
const helmet = require("koa-helmet");

const logger = require("./common/core/logger");
const http = require("./common/http");
const config = require("./common/data/config")("app");

const routes = require("./routes");

const app = new Koa();

require("koa-qs")(app);

app.use(helmet());

app.use(...routes(app));

app.use(async(context) => {
    context.body = "";
    context.status = http.code.notFound;
});

if (require.main === module) {
    app.listen(config.port, () => {
        logger.info(`Server listened on port ${ config.port }`);
    });
}
