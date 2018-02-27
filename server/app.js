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
        data = data.message
        socket.emit('chat', `${socket.username}: ${data}`);
    });

    //socket.io for rooms
    //lets user know when it is connected to the room 
    socket.on('adduser', function (data) {
        console.log('this is the console.log in the adduser on the server', data);
        let usernames = data.players
        socket.username = usernames[usernames.length - 1];
        console.log('data.room: ', data.room);
        socket.join(data.room);
        socket.emit('chat', `Admin: You have connected to room: ${data.room}.`);
        console.log('socket.username on server: ', socket.username);
        socket.broadcast.to(data.room).emit('chat', `Admin: ${socket.username} has connected to the room`);
    });

    //let's all clients know when a user disconnects
    socket.on('disconnect', function (data) {
        socket.broadcast.to(data.room).emit('chat', `Admin: ${socket.username} has disconnected to the room`);
        socket.leave(socket.room);
    });
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