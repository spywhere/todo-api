const adapter = require("./index");

module.exports = adapter.connector({
    todo: {
        getTasksBy: ({ userID, createTimestamp } = {}) => ({
            collection: "tasks",
            find: {
                user_id: userID,
                create_timestamp: createTimestamp
            }
        }),
        createTask: ({ userID, title, description }) => ({
            collection: "tasks",
            insertOne: {
                user_id: userID,
                title,
                description,
                create_timestamp: new Date(),
                update_timestamp: new Date()
            }
        }),
        deleteTask: ({ userID, taskID }) => ({
            collection: "tasks",
            deleteMany: {
                _id: adapter.id(taskID),
                user_id: userID
            }
        })
    }
});
