const errors = require("../../common/http/errors");

module.exports = {
    adapters: [
        "jwt/app",
        "mongodb/tasks"
    ],
    perform: async({ adapters, request }) => {
        const token = await adapters.validateAccessToken({ request });

        const {
            title, description
        } = request.body;

        if (
            typeof(title) !== "string" ||
            !title
        ) {
            throw new errors.BadRequestError(
                "\"title\" is required"
            );
        }

        if (
            typeof(description) !== "string"
        ) {
            throw new errors.BadRequestError(
                "\"description\" need to be a string"
            );
        }

        await adapters.createTask({
            userID: token.uid,
            title,
            description
        });
    }
};
