const adapter = require("./index");
const nosqlQuery = require("../../common/query/nosql");

module.exports = adapter.connector({
    todo: {
        getTasksBy: ({ userID, from, to } = {}) => ({
            collection: "tasks",
            find: {
                user_id: userID,
                ...(
                    (from || to) ? {
                        create_timestamp: adapter.normalize({
                            $gte: from,
                            $lt: to
                        })
                    } : {}
                )
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
        updateTask: ({ userID, taskID, title, description }) => ({
            collection: "tasks",
            updateOne: nosqlQuery({
                _id: adapter.id(taskID),
                user_id: userID
            }, {
                $set: {
                    ...adapter.normalize({
                        title,
                        description
                    }),
                    update_timestamp: new Date()
                }
            })
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
