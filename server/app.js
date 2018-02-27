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
const GoogleUser = require('./models/GoogleUsers');
const User = require('./models/Users');
const FacebookUser = require('./models/FacebookUsers');
const Lobby = require('./models/Lobby');

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

//socket.io for chat & game
io.on('connection', function (socket) {
    console.log('Made socket connection.', socket.id);

    socket.on('chat', function (data) {
        console.log(data);
        io.sockets.emit('chat', data);
    });

    // socket.on('typing', function (data) {
    //     socket.broadcast.emit('typing', data)
    // });

    //socket.io for rooms
    //lets user know when it is connected to the room 
    socket.on('adduser', function (username) {
        socket.username = username;
        usernames[username] = username;
        //need to make join room dynamic
        socket.join('room1');
        socket.emit('updatechat', 'Admin: ', 'you have connected to room1.');
        socket.broadcast.to('room1').emit('updatechat', 'Admin: ', username + 'has connected to this room');
        socket.emit('updaterooms', rooms, 'room1');
    });

    //let's all clients know when a user disconnects
    socket.on('disconnect', function () {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'Admin: ', socket.username + ' has left the room.');
        socket.leave(socket.room);
    });
    //req.user fb + goog 
    //req.session.user
});

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