// Taken from koa-compose with some modifications
module.exports = (middlewares) => {
    if (!Array.isArray(middlewares)) {
        throw new TypeError("Middleware stack must be an array!");
    }

    if (middlewares.some((middleware) => typeof(middleware) !== "function")) {
        throw new TypeError("Middleware must be composed of functions!");
    }

    return (context, next) => {
        let lastIndex = -1;

        function dispatch(index) {
            if (index <= lastIndex) {
                return Promise.reject(
                    new Error("next() called multiple times")
                );
            }
            lastIndex = index;

            let middleware = middlewares[index];

            if (index === middlewares.length) {
                middleware = next;
            }

            if (!middleware) {
                return Promise.resolve();
            }

            try {
                // Always use promise, converted to promise if
                //   needed (via Promise.resolve)
                return Promise.resolve(
                    middleware({
                        context,
                        next: dispatch.bind(null, index + 1)
                    })
                );
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return dispatch(0);
    };
};
