const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

//Path middleware
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

//Load Models
require('./models/GoogleUsers');
require('./models/Users');

//Load Routes
const auth = require('./routes/auth');
const users = require('./routes/users');

//Load Keys file
const keys = require('./config/keys');

// //Passport Config
require('./config/localPassport')(passport);
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


// io.on("connection", function (socket) {
//     socket.on("stream", function (img) {
//         socket.broadcast.emit("stream", img);
//     });
// });

// //Route for all static files from the client side
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
// });

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('Server connected on ' + port);
});
