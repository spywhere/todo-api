const errors = require("../../common/http/errors");

const isoTimestampPattern = new RegExp(
    // eslint-disable-next-line max-len
    /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/
);

module.exports = {
    adapters: [
        "jwt/app",
        "mongodb/tasks"
    ],
    perform: async({ adapters, request }) => {
        const token = await adapters.validateAccessToken({ request });

        const { filter } = request.query;

        const { from, to } = filter || {};

        if (from && !isoTimestampPattern.test(from)) {
            throw new errors.BadRequestError(
                "\"filter.from\" need to be a string in an ISO-8601 format"
            );
        }

        if (to && !isoTimestampPattern.test(to)) {
            throw new errors.BadRequestError(
                "\"filter.to\" need to be a string in an ISO-8601 format"
            );
        }

        const tasks = await adapters.getTasksBy({
            userID: token.uid,
            from: from ? new Date(from) : undefined,
            to: to ? new Date(to) : undefined
        });

        return {
            body: {
                tasks: tasks.map((task) => ({
                    id: task._id,
                    title: task.title,
                    description: task.description,
                    create_timestamp: task.create_timestamp,
                    update_timestamp: task.update_timestamp
                }))
            }
        };
    }
};
