const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FileSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    postedAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('File', FileSchema);