const compose = require("./compose");
const logger = require("./logger");
const loader = require("./loader");

const configLoader = require("../data/config");

function loadAdapters({ adapterPaths }, options) {
    return ((options || {}).adapters || []).concat(
        adapterPaths
    ).map((adapterPath) => {
        const requirePath = loader.getRequirePath(
            "/adapters", `${ adapterPath }`
        );

        if (!requirePath) {
            throw new Error(`Adapter "${ adapterPath }" is not found.`);
        }

        // eslint-disable-next-line global-require
        return require(requirePath)();
    });
}

function setupAdapters({
    adapterList
}) {
    const adapters = adapterList.map(
        (adapter) => adapter.export()
    ).reduce((previous, current) => ({ ...previous, ...current }), {});

    return adapters;
}

class Controller {
    static load(delegateOrPath, options) {
        if (typeof(delegateOrPath) === "string") {
            try {
                return Controller.init(
                    loader.getControllerDelegate(delegateOrPath), options
                );
            } catch (error) {
                logger.error(error);
                return undefined;
            }
        }

        return Controller.init(delegateOrPath, options);
    }

    static init(delegate, options) {
        const adapters = setupAdapters({
            adapterList: loadAdapters({
                adapterPaths: delegate.adapters || []
            }, options)
        });

        return new this({
            delegate,
            adapters
        });
    }

    constructor({
        delegate, adapters
    }) {
        this.delegate = delegate;
        this.adapters = adapters;
    }

    async perform({
        baseConfig,
        request,
        rawRequest
    }) {
        const config = {
            get: (key) => baseConfig[key],
            for: (configPath) => configLoader(configPath)
        };

        const chains = [
            // Build delegate middleware
            async({ context, next }) => {
                // Disable rules as this function run in a composer
                // eslint-disable-next-line require-atomic-updates
                context.response = await this.delegate.perform({
                    config: context.config,
                    adapters: context.adapters,
                    request: context.request
                });
                return next();
            }
        ];

        const context = {
            config,
            adapters: this.adapters,
            httpRequest: rawRequest,
            request,
            response: {}
        };

        await (compose(chains)(context));
        return context.response;
    }
}

module.exports = Controller;
