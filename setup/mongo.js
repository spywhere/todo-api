const records = {
    users: [{
        _id: "5d6001f5caf1cc223606ace7",
        user: "test",
        // Password is "test"
        password: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
        create_timestamp: new Date(),
        update_timestamp: new Date()
    }, {
        _id: "5d601509dff968b2aefe98b8",
        user: "guest",
        // Password is "guest"
        password: "35675e68f4b5af7b995d9205ad0fc43842f16450",
        create_timestamp: new Date(),
        update_timestamp: new Date()
    }],
    tasks: [{
        user_id: "5d6001f5caf1cc223606ace7",
        title: "Book dinner",
        description: "Book a dinner for 4 people on Saturday night",
        create_timestamp: new Date(),
        update_timestamp: new Date()
    }, {
        user_id: "5d601509dff968b2aefe98b8",
        title: "Send flight itinerary",
        description: "Send to Justin via Messages",
        create_timestamp: new Date(),
        update_timestamp: new Date()
    }, {
        user_id: "5d6001f5caf1cc223606ace7",
        title: "Pickup rental car",
        description: "Pickup a car to pickup for dinner",
        create_timestamp: new Date(),
        update_timestamp: new Date()
    }]
};

Object.keys(records).forEach(
    (collection) => db[collection].insertMany(
        records[collection]
    )
);
