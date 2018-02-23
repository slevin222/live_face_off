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
    let user = null;
    if (req.hasOwnProperty('user')){
        user = req.user;
    } else if (req.hasOwnProperty('session') && req.session.hasOwnProperty('user')){
        user = req.session.user;
        user.id = user._id;
    }
    let id = null;
    if (user.hasOwnProperty('id')){
        id = user.id;
    } else if (user.hasOwnProperty('googleID')){
        id = user.googleID;
    } else if (user.hasOwnProperty('facebookID')){
        id = user.facebookID;
    }
    const token = tokenForUser(id);
    if (user) {
        // if (req.xhr){
            res.json({
                isLoggedIn: true,
                token: token
            });
        // } else {
        //     res.redirect('/lobby')
        // }

    } else {
        console.log("Not Auth");
        res.json({
            isLoggedIn: false
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send(req.user || req.session.user);
    console.log('req.session before setting to null', req.session);
    req.session = null;
    console.log('req.session after setting to null', req.session);
});

module.exports = router;