const adapter = require("./index");

module.exports = adapter.connector({
    todo: {
        getTasks: ({ createTimestamp } = {}) => ({
            collection: "tasks",
            find: {
                create_timestamp: createTimestamp
            }
        })
    }
});
