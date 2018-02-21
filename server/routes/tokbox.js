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
router.post('/room/:name', function (req, res) {
    let { gameType } = req.body
    const room = req.params.id;
    if (gameType === 'deal52') {
        gameType = 'gamepage';
    } else if (gameType === 'webcam') {
        gameType = 'camGame';
    }
    console.log('attempting to create a session associated with the room: ' + room);

    // if the room name is associated with a session ID, fetch that
    if (roomToSessionIdDictionary[room]) {
        const sessionId = roomToSessionIdDictionary[room];

        // generate token
        const token = opentok.generateToken(sessionId);
        res.setHeader('Content-Type', 'application/json');
        res.send({
            apiKey: apiKey,
            sessionId: sessionId,
            token: token,
            pathname: `/${gameType}`
        });
    }
    // if this is the first time the room is being accessed, create a new session ID
    else {
        opentok.createSession({ mediaMode: 'routed' }, function (err, session) {
            if (err) {
                console.log(err);
                res.status(500).send({ error: 'createSession error:' + err });
                return;
            }

            // now that the room name has a session associated wit it, store it in memory
            // IMPORTANT: Because this is stored in memory, restarting your server will reset these values
            // if you want to store a room-to-session association in your production application
            // you should use a more persistent storage for them
            roomToSessionIdDictionary[room] = session.sessionId;
            console.log('Session as it is stored in the dictionary: ', roomToSessionIdDictionary[room]);

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

module.exports = router;