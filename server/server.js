// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
const morgan = require('morgan')

const dbConnection = require('./database')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const passport = require('./passport');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PORT = process.env.PORT || 8080;        // set our port

//sessions
app.use(
  session({
    secret: 'mr-potato-head',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls serializeUser and deserializeUser
//serialize saves user id to req.session.passport.user = {id:'...'}
//deserialize chekcs to see if user is saved in db, and if found it assigns
//it to the request as req.user = {user object}

const router = require('./routes/router');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// Starting Server 
const server = app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});


// Chatroom
const io = require("socket.io")(server);

var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: username + " ",
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    console.log(addedUser);
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    console.log('add user - server');
    socket.emit('login', {
      numUsers: numUsers
    });
    console.log(passport.user);
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});