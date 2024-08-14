// This code defines a Mongoose schema and model for a 'Post' in a MongoDB database. 
// This schema defines the structure and data types for the documents in a MongoDB collection.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', PostSchema);