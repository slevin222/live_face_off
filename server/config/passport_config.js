const passport = require('passport');
const mongoose = require('mongoose');

const User = {
    local: mongoose.model('users'),
    facebook: mongoose.model('facebookUsers'),
    google: mongoose.model('googleUsers')
}

passport.serializeUser((user, done) => {
    let userType = 'local';
    if (user.googleID) {
        userType = 'google';
    } else if (user.facebookID) {
        userType = 'facebook'
    }
    done(null, `${user.id}-${userType}`);
});
passport.deserializeUser((id, done) => {
    const userInfo = id.split('-');
    User[userInfo[1]].findById(userInfo[0]).then(user => {
        done(null, user);
    });
});
