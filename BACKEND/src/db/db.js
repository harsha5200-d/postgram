const mongoose = require('mongoose');

async function connectDB() {
    try {
        console.log("Attempting to connect to MongoDB...");
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables!");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Successfully connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        throw error; // Re-throw to be caught in server.js
    }
}

module.exports = connectDB;