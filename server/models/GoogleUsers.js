const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
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
    image: {
        type: String
    }
});

mongoose.model('googleUsers', GoogleUserSchema);