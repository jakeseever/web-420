/*
============================================
; Title:  authController.js
; Author: Jake Seever
; Date:   11 May 2019
; Description: Authorization controller
;===========================================
*/

// Start

var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


// Register a new user on a POST request
exports.user_register = function(req, res) {
    //res.send('NOT IMPLEMENTED: User registration POST');

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email
    });

    User.add(newUser, (err, user) => {
      if (err)
        return res.status(500).send('There was a problem registering the user.');

        var token = jwt.sign({ id:user._id}, config.web.secret, {
          expiresIn: 86400  //24 hours of time
        });

        res.status(200).send({ auth: true, token: token});
    });
};

// Verify token on a GET request
exports.user_token = function(req, res) {
    //res.send('NOT IMPLEMENTED: User token lookup GET');

    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token was provided'});

    jwt.verify(token, config.web.secret, function(err, decoded) {
      if (err) return res.status(500).send({auth:false, message: "Failed ot authenticate token."});

      User.getByID(decoded.id, function(err, user) {
        if (err) return res.status(500).send('There was a problem finding the user.');

        if (!user) return res.status(404).send('No user found.');

        res.status(200).send(user);
      });
    });
};

// Login as an existing user on POST request
exports.user_login = function(req, res) {

  User.getOne(req.body.email, function(err, user) {
      if (err) return res.status(500).send('Error on server.');
      if (!user) return res.status(404).send('No user was found.');

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null});

      var token = jwt.sign({ id: user._id}, config.web.secret, {
          expiresIn: 86400 // Expires in 24 hours.
      });

      res.status(200).send({auth: true, token: token });
  })
};

// Logout the existing user
exports.user_logout = function(req, res) {
  res.status(200).send({ auth: false, token: null});
};

// End
