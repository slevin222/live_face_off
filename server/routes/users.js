const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/Users');
const User = mongoose.model('users');

// Login Form POST
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        };
        if (!user) {
            return res.json({ messages: 'Not a valid combination, please try a different one!' });
        };
        if (user) {
            req.session.user = user;
            res.json({ pathname: '/lobby' });
        }
    })(req, res, next);
});

// Register Form POST
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                res.json({
                    messages: 'Not a valid email, please try a different one!'
                });
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                console.log('You may now login!')
                                res.json({ pathname: '/login' });
                            })
                            .catch(err => {
                                console.log(err);
                                return;
                            });
                    });
                });
            }
        })
});

module.exports = router;

