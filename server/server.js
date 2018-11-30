const express = require("express");
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const db = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Serve up static assets (usually on heroku)
app.use(express.static(path.join(__dirname, 'client/build')));

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Sessions
app.use(
  session({
    secret: 'millenium_falcon', //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: db }),
    resave: true, //required
    saveUninitialized: true //required
  })
)

// Add routes
const user = require('./routes/user')
app.use('/user', user)

// Start the API server
const server = app.listen(PORT, () => { 
 console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
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