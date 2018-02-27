const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const OpenTok = require('opentok');
const _ = require('lodash');
const path = require('path');
const crypto = require('crypto');
const keys = require('../config/keys');
const apiKey = keys.TOKBOX_API_KEY;
const secret = keys.TOKBOX_SECRET;

if (!apiKey || !secret) {
    console.error('=========================================================================================================');
    console.error('');
    console.error('Missing TOKBOX_API_KEY or TOKBOX_SECRET');
    console.error('Find the appropriate values for these by logging into your TokBox Dashboard at: https://tokbox.com/account/#/');
    console.error('Then add them to ', path.resolve('.env'), 'or as environment variables');
    console.error('');
    console.error('=========================================================================================================');
    process.exit();
};

//Load Helpers
const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/auth');

// Load Lobby model
require('../models/Lobby');
const Lobby = mongoose.model('lobby');

//Load Google Model
const User = mongoose.model('googleUsers');


const opentok = new OpenTok(apiKey, secret);

//Creates a room and checks to see if one has already been used with the same number
//seed the random number
let roomContainer = [];
let room;
function createARoom() {
    room = Math.ceil(Math.random() * (new Date()));
    if (roomContainer.indexOf(room) > 0) {
        createAroom();
    } else {
        roomContainer.push(room);
    }
    return room;
}
let roomKey;
function createHash() {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    roomKey = crypto.createHash('sha1').update(current_date + random).digest('hex');
    roomKey = roomKey.slice(1, 11);
    return roomKey;
}

//This route generates a room/hash and creates the lobby in the database, then sends the information back to the user
router.post('/room', ensureAuthenticated, function (req, res) {
    let { gameType, maxPlayers } = req.body
    createARoom();
    createHash();
    if (gameType === 'deal52') {
        gameType = 'gamepage';
    } else if (gameType === 'webcam') {
        gameType = 'camGame';
    }
    console.log('This is the has from the new room: ', roomKey);
    console.log('attempting to create a session associated with the room: ' + room);
    // if the room name is associated with a session ID, fetch that
    Lobby.findOne({ roomNumber: room }, 'players sessionId', (err, lobby) => {
        if (err) return next(err);
        if (!lobby) {
            // if this is the first time the room is being accessed, create a new session ID
            opentok.createSession({ mediaMode: 'routed' }, function (err, session) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: 'createSession error:' + err });
                    return;
                }
                const lobby = new Lobby({
                    roomNumber: room,
                    gameType: gameType,
                    roomKey: roomKey,
                    sessionId: session.sessionId,
                    players: [req.user.firstName],
                    maxPlayer: maxPlayers
                });
                lobby.save((err) => {
                    if (err) return next(err);
                });
                // generate token
                const token = opentok.generateToken(session.sessionId);
                res.setHeader('Content-Type', 'application/json');
                res.send({
                    apiKey: apiKey,
                    sessionId: session.sessionId,
                    token: token,
                    roomKey: roomKey,
                    pathname: `/${gameType}`
                });
            });
        }
    });
});

//Get User information to display correctly on the Lobby Page
router.get('/lobby', (req, res) => {
    if (req.user) {
        res.json({
            firstName: req.user.firstName,
            lastName: req.user.lastName
        });
    }
});

//Socket.io chat setup with user names and room attached to
//Post route to grab info from gamepages before they load
router.post('/sockets', (req, res, next) => {
    let room = req.body.room;
    let players = [];
    Lobby.findOne({ roomKey: room }, (err, lobby) => {
        console.log('lobby in post call: ', lobby);
        if (err) return next(err);
        if (lobby) {
            players = lobby.players
        }
        res.json({
            players
        });
    });
});

//Use roomKey to Join a room. Room key is given to the user when they hit the start button
router.post('/create', ensureAuthenticated, (req, res) => {
    let { roomKey } = req.body;
    Lobby.findOne({ roomKey: roomKey }, (err, lobby) => {
        if (err) return next(err);
        if (!lobby) {
            res.json({ messages: 'That lobby does not exist!' });
        } else {
            if (lobby.maxPlayer === lobby.players.length) {
                return res.json({
                    messages: 'Uh oh, that lobby is full!'
                });
            };
            console.log('Lobby: ', lobby);
            lobby.players.push(req.user.id);
            lobby.save(function (err, updatedLobby) {
                if (err) return next(err);
            });
            // generate token
            const token = opentok.generateToken(lobby.sessionId);
            res.setHeader('Content-Type', 'application/json');
            res.send({
                apiKey: apiKey,
                sessionId: lobby.sessionId,
                token: token,
                roomKey: roomKey,
                pathname: `/${lobby.gameType}`
            });
        }
    })
});

module.exports = router;