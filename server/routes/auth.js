const express = require('express');
const passport = require('passport');
const router = express.Router();


//GOOGLE ROUTES

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    // failureRedirect: 'http://localhost:5000/login'
    failureRedirect: '/login'
}), (req, res) => {
    //Successful authentication, redirect home. if you redirect  res.redirect('http://localhost:3000/gamepage' will go to game page
    // res.redirect('http://localhost:5000/gamepage');
    //When deploying on same server
    res.redirect('/gamepage');
});

//FACEBOOK ROUTES
router.get('/facebook',
    passport.authenticate('facebook', {
        scope: ['profile', 'email']
    }));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        // failureRedirect: 'http://localhost:5000/login'
        failureRedirect: '/login'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        // res.redirect('http://localhost:5000/gamepage');
        res.redirect('/gamepage');
    });

router.get('/verify', (req, res) => {
    if (req.user) {
        console.log(req.user);
    } else {
        console.log("Not Auth");
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;