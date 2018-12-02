const express = require('express');
const router = express.Router()
const passport = require('../passport')
const User = require('../database/models/user');


router.post('/user/signup', (req, res) => {
  let newUser = req.body;  
  newUser = new User({
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    email: email
    })
  newUser.save();
  res.status(201).send(newUser)
})

//Signup
router.post('/user/signup', (req, res) => {
  newUser = req.body;
  console.log(newUser);
  User.findOne({ username: newUser.username }, (err, user) => {
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
        firstname: firstname,
        lastname: lastname,
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
  router.post('/user/login', (req, res, next) => {
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
  router.get('/user', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
  })

  // Log out
  router.post('/user/logout', (req, res) => {
    if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  })

  module.exports = router