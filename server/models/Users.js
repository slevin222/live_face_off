const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        index: { unique: true }
    },
    password: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('users', UserSchema);