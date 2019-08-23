const Adapter = require("../adapter");
const config = require("../../common/data/config");

const jwt = require("jsonwebtoken");

class JWTAdapter extends Adapter {
    async execute(domain, parameter) {
        const options = config("jwt")[domain];

        if (!options) {
            throw new Error(`Domain ${ domain } is not setup a JWT`);
        }

        if (typeof(parameter) !== "function") {
            throw new Error("Expect a function for JWT operations");
        }

        const {
            secret,
            duration
        } = {
            secret: "secret",
            duration: 3600,
            ...options
        };

        return Promise.resolve(parameter({
            generate: (payload) => jwt.sign(
                payload,
                secret,
                {
                    expiresIn: duration
                }
            ),
            decode: (token) => {
                try {
                    return jwt.verify(token, secret);
                } catch (error) {
                    return undefined;
                }
            }
        }));
    }
}

module.exports = JWTAdapter;
