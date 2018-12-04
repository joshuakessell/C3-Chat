
module.exports = function (app) {
  
const express = require('express');
const router = express.Router()
const passport = require('../passport')
const User = require('../database/models/user');

// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('===API CALL===');
  next(); // make sure we go to the next routes and don't stop here
});


router.post('/signup', (req, res) => {
  let newUser = req.body;  
  newUser = new User({
    username: username,
    password: password,
    email: email
    })
  newUser.save();
  res.status(201).send(newUser)
})


router.post('/signup', (req, res) => {
  // create a user (accessed at POST http://localhost:8080/api/signup)
  let user = new User();      // create a new instance of the User model
  user = req.body;  // set the user information 

  // save the user and check for errors
  user.save(function (err) {
    if (err)
      res.send(err);
    res.json({ message: 'User created!' });
  });
});

//Signup
router.post('/signup', (req, res) => {
  let checkUser = req.body;
  console.log(checkUser);
  User.findOne({ username: checkUser.username }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      })
    }
    else {
      newUser = new User({
        username: username,
        password: password,
        email: email
      })
      newUser.save()
        .then(item => {
          res.send('item saved to database');
          this.setState({ redirectTo: '/' })
            .catch(err => {
              res.status(400).send('unable to save to database');
            });
        });
      };
    });
  })


  //Sign in and authenticate
  router.post('/login', (req, res, next) => {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body)
    next()
  },
    passport.authenticate('local'), (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
        username: req.user.username
      };
      res.send(userInfo);
    }
  )

  //Grab current/previous logged in user session if available.
  router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
  })

  // Log out
  router.post('/logout', (req, res) => {
    if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  })



  }