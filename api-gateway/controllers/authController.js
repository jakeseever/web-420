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


// Register a new user on a POST request
exports.user_register = function(req, res) {
    res.send('NOT IMPLEMENTED: User registration POST');
};

// Verify token on a GET request
exports.user_token = function(req, res) {
    res.send('NOT IMPLEMENTED: User token lookup GET');
};

// End
