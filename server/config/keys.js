module.exports = {
    mongoURI: 'mongodb://khaleel:final123@ds031845.mlab.com:31845/finalproject-dev',
    googleClientID: '570303934194-q8l92a0frkqcred9jhmne4gs7t6jcaqj.apps.googleusercontent.com',
    googleClientSecret: 'TCmxJ9DqDilO4J51bt54pPhM',
    facebookClientID: '1929806060363399',
    facebookClientSecret: '2fe86ae1157787ba555e42427efc6f28',
    TWILIO_ACCOUNT_SID: 'AC5d330b703ce34a7a99c2e7038cc06936',
    TWILIO_API_KEY: 'SK1881227f50999f7e0a8ad1d0bfcf3124',
    TWILIO_API_SECRET: 'f6a2SKJnD7yGIxn71L8GqWZJosUlhDEQ',
    TOKBOX_API_KEY: '46061342',
    TOKBOX_SECRET: '402a524fddd0c458f75f99ce256e6b7b128da88d'
};

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}