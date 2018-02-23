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

/**
 * GET /room/
 */
router.post('/room', ensureAuthenticated, function (req, res) {
    let { gameType, maxPlayers } = req.body
    createARoom();
    createHash();
    if (gameType === 'deal52') {
        gameType = 'gamepage';
    } else if (gameType === 'webcam') {
        gameType = 'camGame';
    }
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
                    players: [req.session.user._id || req.user.googleID],
                    maxPlayer: maxPlayers
                });
                console.log('This is a lobby after it is created: ', lobby);
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
                    pathname: `/${gameType}`
                });
            });
        }
    });
});

router.get('/lobby', (req, res) => {
    console.log('req.session.user: ', req.session.user);
    console.log('req.user: ', req.user);
    if (req.session.user) {
        res.json({
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName
        });
    } else if (req.user) {
        res.json({
            firstName: req.user.firstName,
            lastName: req.user.lastName
        });
    }
});

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
            lobby.players.push(req.session.user._id);
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