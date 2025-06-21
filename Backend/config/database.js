const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit the process with an error code if the connection fails
    }
};


module.exports = connect;

