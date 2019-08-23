module.exports = {
    adapters: [
        "mongodb/tasks"
    ],
    perform: async({ adapters }) => {
        return {
            body: {
                tasks: await adapters.getTasks()
            }
        };
    }
};
