const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();


//Load Models
require('./models/Users');

//Load Routes
const auth = require('./routes/auth');

//Load Keys file
const keys = require('./config/keys');

//Passport Config
require('./config/localpassport')(passport);
require('./config/googlepassport')(passport);

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log('mongoDB connected')
    })
    .catch(err => console.log(err));

//Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Use Routes
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Hello');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server connected on ' + port);
})