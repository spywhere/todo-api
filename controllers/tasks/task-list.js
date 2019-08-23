module.exports = {
    adapters: [
        "jwt/app",
        "mongodb/tasks"
    ],
    perform: async({ adapters, request }) => {
        const token = await adapters.validateAccessToken({ request });

        const tasks = await adapters.getTasksBy({
            userID: token.uid
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
