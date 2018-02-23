const express = require('express');
const passport = require('passport');
const jwt = require('jwt-simple');
const router = express.Router();
const keys = require('../config/keys_dev');

//Generate a token
function tokenForUser(user) {
    const ts = new Date().getTime();
    return jwt.encode({
        uid: user.id,
        ts: ts
    }, keys.secretsecret);
};

//GOOGLE ROUTES
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/lobby');
});

//FACEBOOK ROUTES
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/lobby'
}));
// }), (req, res) => {
//     res.redirect('/lobby');
// });

router.get('/verify', (req, res) => {
    console.log(req.user || req.session.user);
    if (req.user || req.session.user) {
        res.json({
            isLoggedIn: true,
            token: tokenForUser(req.user.id || req.session.user._id)
        });
        console.log(req.user || req.session.user);
    } else {
        console.log("Not Auth");
        res.json({
            isLoggedIn: false
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;