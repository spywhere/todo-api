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

        await adapters.deleteTask({
            userID: token.uid,
            taskID
        });
    }
};
