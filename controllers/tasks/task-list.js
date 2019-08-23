module.exports = {
    adapters: [
        "jwt/app",
        "mongodb/tasks"
    ],
    perform: async({ adapters, request }) => {
        const token = await adapters.validateAccessToken({ request });

        return {
            body: {
                tasks: await adapters.getTasksBy({
                    userID: token.uid
                })
            }
        };
    }
};
