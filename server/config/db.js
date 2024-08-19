const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

let mongoClient;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
        mongoClient = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });
        await mongoClient.connect();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const getMongoClient = () => mongoClient;

module.exports = { connectDB, getMongoClient };
