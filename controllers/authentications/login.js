const errors = require("../../common/http/errors");
const crypto = require("../../common/crypto");

module.exports = {
    adapters: [
        "jwt/app",
        "mongodb/users"
    ],
    perform: async({ adapters, request }) => {
        const { user: userName, password } = request.body;

        if (
            !userName ||
            !password
        ) {
            throw new errors.BadRequestError(
                "User and/or password are required"
            );
        }

        if (
            typeof(userName) !== "string" ||
            typeof(password) !== "string"
        ) {
            throw new errors.BadRequestError(
                "User and/or password are invalid"
            );
        }

        const user = await adapters.getUserBy({
            user: userName
        });

        if (
            !user ||
            user.password !== crypto.sha1(password)
        ) {
            throw new errors.BadRequestError(
                "User and/or password are invalid"
            );
        }

        return {
            body: {
                access_token: await adapters.generateAccessToken({
                    payload: {
                        uid: user._id
                    }
                })
            }
        };
    }
};
