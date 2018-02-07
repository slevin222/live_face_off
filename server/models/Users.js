const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    local: {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    social: {
        google: {
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
        }
    }
});

mongoose.model('users', UserSchema);