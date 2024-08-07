// This code defines a Mongoose schema and model for a 'User' in a MongoDB database.
// This schema specifies the structure of user documents, which includes a username and password.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);