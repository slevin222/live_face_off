const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LobbySchema = new Schema({
    roomNumber: {
        type: String
    },
    gameType: {
        type: String
    },
    sessionId: {
        type: String
    },
    players: {
        type: Array
    },
    maxPlayer: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('lobby', LobbySchema);