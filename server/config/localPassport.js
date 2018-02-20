const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

// expose this function to our app using module.exports
module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({
            email: email
        })
            .then(user => {
                if (!user) {
                    return done(null, false);
                };
                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            })
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};









// used to serialize the user for the session
//                 passport.serializeUser((user, done) => {
//                     done(null, user.id);
//                 });

//                 // used to deserialize the user
//                 passport.deserializeUser((id, done) => {
//                     User.findById(id, (err, user) => {
//                         done(err, user);
//                     });
//                 });

//             }));

//     passport.use('local-login', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     }, (req, email, password, done) => {
//         // we are checking to see if the user trying to login already exists
//         User.findOne({ email: email }, (err, user) => {
//             // if there are any errors, return the error before anything else
//             if (err)
//                 return done(err);
//             // if no user is found, return the message
//             if (!user)
//                 return done(null, false, console.log('No User Found'));
//             // if the user is found but the password is wrong
//             if (!user.validPassword(password))
//                 return done(null, false, Console.log('Wrong Password'));
//             // all is well, return successful user
//             return done(null, user);
//         });
//     }));
// };
