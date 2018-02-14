const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Load User Model
require('../models/Users');
const User = mongoose.model('users');

// Login Form POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: 'http://localhost:3000/gamepage',
        failureRedirect: 'http://localhost:3000/login',
    })(req, res, next);
});

// Register Form POST
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                console.log(user);
                console.log('Email in use');
                res.redirect('http://localhost:3000/register');
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
                                res.redirect('http://localhost:3000/login');
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

