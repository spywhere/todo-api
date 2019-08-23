const errors = require("../../common/http/errors");

module.exports = {
    adapters: [
        "jwt/app",
        "mongodb/tasks"
    ],
    perform: async({ adapters, request }) => {
        const token = await adapters.validateAccessToken({ request });

        const {
            taskID
        } = request.parameter;

        if (
            typeof(taskID) !== "string" ||
            !taskID
        ) {
            throw new errors.BadRequestError(
                "\"taskID\" is required"
            );
        }

        const {
            title, description
        } = request.body;

        if (
            title !== undefined &&
            typeof(title) !== "string"
        ) {
            throw new errors.BadRequestError(
                "\"title\" need to be a string"
            );
        }

        if (
            description !== undefined &&
            typeof(description) !== "string"
        ) {
            throw new errors.BadRequestError(
                "\"description\" need to be a string"
            );
        }

        await adapters.updateTask({
            userID: token.uid,
            taskID,
            title,
            description
        });
    }
};
