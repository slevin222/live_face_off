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

const GoogleUser = mongoose.model('googleUsers');
const FacebookUser = mongoose.model('facebookUsers');
const LocalUser = mongoose.model('users');

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

//cookie-session middleware
app.use(session({
    keys: [keys.sessionKey],
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

//CookieParser middleware
app.use(cookieParser());

//Use Routes
app.use('/auth', auth);
app.use('/users', users);
app.use('/tokbox', tokbox);

//socket.io for chat & game
io.on('connection', function (socket) {
    console.log('Made socket connection.', socket.id);

    socket.on('chat', function (data) {
        let message = data.message
        let room = data.room;
        io.to(room).emit('chat', `${socket.username}: ${message}`);
    });

    //socket.io for rooms
    //lets user know when it is connected to the room 
    socket.on('adduser', function (data) {
        socket.totalUsers = data.players;
        socket.room = data.room;
        let usernames = data.players
        socket.username = usernames[usernames.length - 1];
        socket.join(data.room);
        socket.emit('chat', `Admin: You have connected to room: ${data.room}.`);
        socket.broadcast.to(data.room).emit('chat', `Admin: ${socket.username} has connected to the room`);
    });

    //Socket.io for starting a game
    //waits until the entire room is full before beginning
    socket.on('startGame', function (data) {
        socket.join(data.room);
        if (data.roomPlayers.length === parseInt(data.maxPlayers)) {
            io.to(data.room).emit('startGame', 'hello from the other side');
        } else {
            return;
        }
    });

    //Socket.io for starting a game
    //waits until the entire room is full before beginning
    socket.on('restartGame', function (data) {
        console.log('data: ', data);
        let finishedPlayers = data.roomPlayers;
        console.log('finishedPlayers: ', finishedPlayers);
        if (finishedPlayers.length === parseInt(data.maxPlayers)) {
            io.to(data.room).emit('startGame', 'hello from the other side');
        } else {
            return;
        }
    });

    //socket.io that checks when deal52 game has finished
    socket.on('endGame', function (data) {
        console.log('socket.totalUsers: ', socket.totalUsers);
        socket.finishedPlayers = [];
        let scoreArray = [];
        let winningNumber;
        let winningName;
        io.to(socket.room).emit('chat', `Admin: ${socket.username}'s final score is: ${data.finalScore}.`);
        let finishedPlayerUsername = socket.totalUsers.splice(socket.username, 1);
        console.log('finishedPlayerUsername: ', finishedPlayerUsername);
        let finishedPlayerFinalScore = data.finalScore;
        socket.finishedPlayers.push({
            username: finishedPlayerUsername,
            finalScore: finishedPlayerFinalScore
        });
        console.log('finishedPlayers: ', socket.finishedPlayers);
        // GoogleUser.findOne({ firstName: socket.username }, (err, user) => {
        //     if (err) return next(err);
        //     if (user) {
        //         user.gamesPlayed = ++user.gamesPlayed
        //     }
        //     user.save((err) => {
        //         if (err) return next(err);
        //     });
        // });
        console.log('finishedPlayers length: ', socket.finishedPlayers.length);
        console.log('totalUsers length: ', socket.totalUsers.length);
        if (socket.finishedPlayers.length === socket.totalUsers.length) {
            for (let playerIndex = 0; playerIndex < socket.finishedPlayers.length; playerIndex++) {
                scoreArray.push(socket.finishedPlayers[playerIndex].finalScore);
            }
            let winningNumber = Math.min(...scoreArray);
            for (let numberIndex = 0; numberIndex < socket.finishedPlayers.length; numberIndex++) {
                if (winningNumber === socket.finishedPlayers[numberIndex].finalScore) {
                    winningName = socket.finishedPlayers[numberIndex].username;
                }
            }
            console.log('winningNumber: ', winningNumber);
            GoogleUser.findOne({ firstName: winningName }, (err, user) => {
                console.log('winning name inside of googleuser: ', winningName);
                if (err) return next(err);
                if (user) {
                    user.wins = ++user.wins
                }
                user.save((err) => {
                    if (err) return next(err);
                });
            });
        } else {
            return;
        }
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

//Port depending on where it is listening
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server connected on ' + port);
});