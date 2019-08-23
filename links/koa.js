const bodyParser = require("koa-bodyparser");

const Link = require("../common/core/link");
const config = require("../common/data/config")("app", {});
const http = require("../common/http");
const errors = require("../common/http/errors");

class KoaLink extends Link {
    static init(app, router) {
        return new this(app, router);
    }

    constructor(app, router) {
        super(app);
        this.router = router;
        this.baseConfig = config;
    }

    setupDelegate({ method, path, perform }) {
        this.router[method](
            path,
            bodyParser(),
            async(context) => {
                const delegateRequest = {
                    header: context.headers || {},
                    query: context.query || {},
                    parameter: context.params || {},
                    body: context.request.body || {}
                };

                try {
                    const response = await perform({
                        request: delegateRequest,
                        baseConfig: this.baseConfig,
                        rawRequest: context.request
                    }) || {};

                    if (
                        (
                            typeof(response.body) === "object" &&
                            !Buffer.isBuffer(response.body)
                        )
                    ) {
                        context.set("Content-Type", "application/json");
                    }

                    if (response.header) {
                        context.set(response.header);
                    }

                    // eslint-disable-next-line require-atomic-updates
                    context.status = response.status || http.code.ok;
                    // eslint-disable-next-line require-atomic-updates
                    context.body = (
                        response.body === undefined ? "" : response.body
                    );
                } catch (error) {
                    const {
                        status, body
                    } = errors.convertToHTTPResponse(error);

                    // eslint-disable-next-line require-atomic-updates
                    context.status = status;
                    // eslint-disable-next-line require-atomic-updates
                    context.body = body;
                }
            }
        );
    }
}

module.exports = KoaLink;
