const adapter = require("./index");

module.exports = adapter.connector({
    todo: {
        getUserBy: ({ user } = {}) => ({
            collection: "users",
            findOne: {
                user
            }
        })
    }
});
