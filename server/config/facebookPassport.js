const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

//Load user model
const User = mongoose.model('facebookUsers');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken);
        const newUser = {
            facebookID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            token: accessToken
        }
        console.log('New User added: ', newUser);
        //Check for existing user
        User.findOne({
            facebookID: profile.id
        }).then(user => {
            if (user) {
                // return user
                done(null, user);
            } else {
                //create user
                new User(newUser)
                    .save()
                    .then(user => done(null, user));
            }
        });
    })
    );
}
