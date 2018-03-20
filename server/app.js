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
const Lobby = mongoose.model('lobby');

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

//Helper function for finding and saving winner to database for socket.
let secureWinner = (socket, winner) => {
    let searchID;
    let User;
    let id;
    if (socket.playerId.local) {
        searchID = '_id';
        User = LocalUser;
        id = socket.playerId.local.toString();;
    } else if (socket.playerId.google) {
        searchID = 'googleID';
        User = GoogleUser;
        id = socket.playerId.google.toString();;
    } else if (socket.playerId.facebook) {
        searchID = 'facebookID';
        User = FacebookUser;
        id = socket.playerId.facebook.toString();;
    }
    User.findOne({ [searchID]: id }, (err, user) => {
        if (err) return next(err);
        if (user) {
            user.wins++
        }
        user.save((err) => {
            if (err) return next(err);
        });
    });
}

//Helper function for adding to gamesplayed for user in socket.
let addToGamesPlayed = (socket) => {
    let searchID;
    let User;
    let id;
    if (socket.playerId.local) {
        searchID = '_id';
        User = LocalUser;
        id = socket.playerId.local.toString();
    } else if (socket.playerId.google) {
        searchID = 'googleID';
        User = GoogleUser;
        id = socket.playerId.google.toString();
    } else if (socket.playerId.facebook) {
        searchID = 'facebookID';
        User = FacebookUser;
        id = socket.playerId.facebook.toString();
    }
    User.findOne({ [searchID]: id }, (err, user) => {
        if (err) return next(err);
        if (user) {
            user.gamesPlayed++;
            if (socket.finalScore < user.deal52LowestScore) {
                user.deal52LowestScore = socket.finalScore;
            }
        }
        user.save((err) => {
            if (err) return next(err);
        });
    });
}

//socket.io for chat & game
io.on('connection', function (socket) {
    console.log('Made socket connection.', socket.id);

    socket.on('chat', function (data) {
        io.to(data.room).emit('chat', `${socket.username}: ${data.message}`);
    });

    //socket.io for rooms
    //lets user know when it is connected to the room 
    socket.on('adduser', function (data) {
        socket.room = data.room;
        socket.username = data.player
        socket.join(data.room);
        socket.emit('chat', `Admin: You have connected to room: ${data.room}`);
        socket.broadcast.to(data.room).emit('chat', `Admin: ${data.player} has connected to the room`);
    });

    //Socket.io for starting a game
    //waits until the entire room is full before beginning
    socket.on('startGame', function (data) {
        socket.room = data.room;
        socket.username = data.player
        socket.playerId = data.playerId;
        socket.join(data.room);
        Lobby.findOne({ roomKey: socket.room }, (err, lobby) => {
            if (err) return next(err);
            if (lobby) {
                lobby.activePlayers.push(socket.username);
            }
            lobby.save((err) => {
                if (err) return next(err);
            });
            if (lobby.activePlayers.length === lobby.maxPlayer) {
                io.to(data.room).emit('startGame', 'hello from the other side');
            } else {
                return;
            }
        });
    });

    //Socket.io for starting a game
    //waits until the entire room is full before beginning
    socket.on('restartGame', function (data) {
        Lobby.findOne({ roomKey: socket.room }, (err, lobby) => {
            if (err) return next(err);
            if (lobby) {
                if (lobby.activePlayers.includes(socket.username)) {
                    lobby.activePlayers.splice(socket.username, 1);
                    lobby.finishedPlayers.push(socket.username);
                } else if (lobby.finishedPlayers.includes(socket.username)) {
                    lobby.finishedPlayers.splice(socket.username, 1);
                    lobby.activePlayers.push(socket.username);
                }
            }
            console.log('lobby.activePlayers: ', lobby.activePlayers);
            console.log('lobby.finishedPlayers: ', lobby.finishedPlayers);
            lobby.save((err) => {
                if (err) return next(err);
            });
            if ((lobby.finishedPlayers.length || lobby.activePlayers.length) === lobby.maxPlayer) {
                io.to(data.room).emit('startGame', 'hello from the other side');
            } else {
                return;
            }
        });
    });

    //socket.io that checks when deal52 game has finished
    //adds player object to games array in db --- when full checks for winner using helper functions, then sets length back to 0 for the next round
    socket.on('endGame', function (data) {
        socket.finalScore = data.finalScore;
        Lobby.findOne({ roomKey: data.room }, (err, lobby) => {
            if (err) return next(err);
            if (lobby) {
                if (lobby.deal52Games.length >= lobby.maxPlayer) {
                    while (lobby.deal52Games.length > 0) {
                        lobby.deal52Games.pop();
                    }
                    lobby.save(function (err) {
                        if (err) return err;
                    });
                }
                let object = {
                    username: socket.username,
                    finalScore: data.finalScore
                };
                lobby.deal52Games.push(object);
                addToGamesPlayed(socket);
                lobby.save(function (err) {
                    if (err) return err;
                });
                if (lobby.deal52Games.length === lobby.maxPlayer) {
                    let lowestNumber = 100;
                    let winner;
                    for (let playerIndex = 0; playerIndex < lobby.deal52Games.length; playerIndex++) {
                        if (lobby.deal52Games[playerIndex].finalScore < lowestNumber) {
                            lowestNumber = lobby.deal52Games[playerIndex].finalScore;
                            winner = lobby.deal52Games[playerIndex].username;
                        } else if (lobby.deal52Games[playerIndex].finalScore === lowestNumber) {

                        }
                    }
                    secureWinner(socket, winner);
                    io.to(data.room).emit('chat', `Admin: ${winner} has won with a final score of: ${lowestNumber}.`);
                }
            }
        });
        io.to(data.room).emit('chat', `Admin: ${socket.username}'s final score is: ${data.finalScore}.`);
    });

    //let's all clients know when a user disconnects from chat
    socket.on('chatDisconnected', function (data) {
        io.to(data.room).emit('chat', `Admin: ${data.player} has left the room.`);
        Lobby.findOne({ roomKey: data.room }, (err, lobby) => {
            if (err) return next(err);
            if (lobby) {
                lobby.maxPlayer--;
            }
            lobby.save(function (err, lobby) {
                if (err) return next(err);
            });
        });
        socket.leave(data.room);
        socket.disconnect();
    });

    //Disconnects the game socket without letting the chat know they have disconnected.
    socket.on('gameDisconnected', function (data) {
        socket.leave(data.room);
        socket.disconnect();
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