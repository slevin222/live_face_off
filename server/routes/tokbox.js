const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const OpenTok = require('opentok');
const _ = require('lodash');
const path = require('path');
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

// Load Lobby model
const Lobby = mongoose.model('lobby');


const opentok = new OpenTok(apiKey, secret);


const roomToSessionIdDictionary = {};

// returns the room name, given a session ID that was associated with it
function findRoomFromSessionId(sessionId) {
    return _.findKey(roomToSessionIdDictionary, function (value) { return value === sessionId; });
};

/**
 * GET /session redirects to /room/session
 */
router.get('/session', function (req, res) {
    res.redirect('/room/session');
});

/**
 * GET /room/:name
 */
router.post('/room/:id', function (req, res) {
    let { gameType, players } = req.body
    console.log(req.params.id);
    let room = req.params.id;
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
                console.log("This is the session", session);
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: 'createSession error:' + err });
                    return;
                }

                const lobby = new Lobby({
                    roomNumber: room,
                    gameType: gameType,
                    sessionId: session.sessionId,
                    players: [req.session.user._id],
                    maxPlayer: players
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
                    pathname: `/${gameType}`
                });
            });
        } else {
            lobby.players.push(req.session.user._id);
            lobby.save(function (err, updatedLobby) {
                if (err) return next(err);

                console.log("This is our updatedLobby", updatedLobby);
            });

            // generate token
            const token = opentok.generateToken(lobby.sessionId);
            res.setHeader('Content-Type', 'application/json');
            res.send({
                apiKey: apiKey,
                sessionId: lobby.sessionId,
                token: token,
                pathname: `/${gameType}`
            });
        }
    });



});

module.exports = router;