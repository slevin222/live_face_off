const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();


//Load Models
require('./models/GoogleUsers');
require('./models/Users');

//Load Routes
const auth = require('./routes/auth');
const users = require('./routes/users');

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

//Cross Browser compatiability 
app.use(cors());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

//Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

//Use Routes
app.use('/auth', auth);
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/test', (req, res) => {
    res.send({ msg: 'Data from server here' });
});

app.post('/test', (req, res) => {
    console.log('Test post request data:', req.body);
    res.send({ msg: 'Data from post request', dataReceived: req.body });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server connected on ' + port);
});
