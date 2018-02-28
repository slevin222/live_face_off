const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Facebook Schema
const FacebookUserSchema = new Schema({
    facebookID: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    token: {
        type: String
    }
});

mongoose.model('facebookUsers', FacebookUserSchema);