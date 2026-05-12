const mongoose = require('mongoose');

async function connectDB() {
    // await mongoose.connect('mongodb+srv://krishna:haribol@gorango.oqk6wyf.mongodb.net/project1')
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB');
}

module.exports = connectDB;