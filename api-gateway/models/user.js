/*
============================================
; Title:  user.js
; Author: Jake Seever
; Date:   May 12 2019
; Description: User model and schema
;===========================================
*/

// Start

/**
 Fields username, password, and email for the user
 */

var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);
