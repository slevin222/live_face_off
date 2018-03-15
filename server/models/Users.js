const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Local Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('users', UserSchema);