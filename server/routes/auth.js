const express = require('express');
const passport = require('passport');
const jwt = require('jwt-simple');
const router = express.Router();
const keys = require('../config/keys_dev');

//Generate a token
function tokenForUser(id) {
    const ts = new Date().getTime();
    return jwt.encode({
        uid: id,
        ts: ts
    }, keys.secret);
};

//GOOGLE ROUTES
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/login');
});

//FACEBOOK ROUTES
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/login');
});


router.get('/verify', (req, res) => {
    if (!req.user) {
        console.log("Not Authorized: ", req.user);
        return res.json({
            isLoggedIn: false
        });
    }
    let id = null;
    if (req.user.hasOwnProperty('id')) {
        id = req.user.id;
    } else if (req.user.hasOwnProperty('googleID')) {
        id = req.user.googleID;
    } else if (req.user.hasOwnProperty('facebookID')) {
        id = req.user.facebookID;
    }
    const token = tokenForUser(id);
    if (req.user) {
        res.json({
            isLoggedIn: true,
            token: token
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user);
});

module.exports = router;