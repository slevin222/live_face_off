const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Google Schema
const GoogleUserSchema = new Schema({
    googleID: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
});

mongoose.model('googleUsers', GoogleUserSchema);