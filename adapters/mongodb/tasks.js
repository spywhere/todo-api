const adapter = require("./index");

module.exports = adapter.connector({
    todo: {
        getTasksBy: ({ userID, createTimestamp } = {}) => ({
            collection: "tasks",
            find: {
                user_id: userID,
                create_timestamp: createTimestamp
            }
        })
    }
});
