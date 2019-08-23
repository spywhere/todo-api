const adapter = require("./index");
const errors = require("../../common/http/errors");

module.exports = adapter.connector({
    app: {
        generateAccessToken: ({ payload }) => async(jwt) => (
            jwt.generate(payload || {})
        ),
        validateAccessToken: ({ request }) => async(jwt) => {
            const { authorization } = request.header;
            if (!authorization) {
                throw new errors.NotFoundError();
            }

            const [ type, token ] = authorization.split(" ");

            if (type !== "bearer" || !token) {
                throw new errors.NotFoundError();
            }

            const payload = jwt.decode(token);

            if (!payload) {
                throw new errors.NotFoundError();
            }

            return payload;
        }
    }
});
