const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

//Path middleware
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

//Load Helpers
const {
    ensureAuthenticated,
    ensureGuest
} = require('./helpers/auth');

//Load Models
require('./models/GoogleUsers');
require('./models/Users');
require('./models/FacebookUsers');
require('./models/Lobby');

//Load Routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const tokbox = require('./routes/tokbox');

//Load Keys file
const keys = require('./config/keys');

//Passport Config
require('./config/passport_config');
require('./config/localPassport')(passport);
require('./config/googlePassport')(passport);
require('./config/facebookPassport')(passport);

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log('mongoDB connected')
    })
    .catch(err => console.log(err));

app.use(session({
    keys: ['PCKS#1217'],
    maxAge: 30 * 24 * 60 * 60 * 1000
}));

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

//Use Routes
app.use('/auth', auth);
app.use('/users', users);
app.use('/tokbox', tokbox);


//socket.io for chat 
io.on('connection', function (socket) {
    console.log('Made socket connection.', socket.id)
    socket.on('chat', function (data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data)
    });
});

io

//Route for all static files from the client side
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server connected on ' + port);
});