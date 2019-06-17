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

const User = module.exports = mongoose.model('User', userSchema);

/**
 Database queries
 */

// user.save is used to add a new user in our database.
module.exports.add = (user, callback) => {
  user.save(callback);
};

// Query users by id from our database.
module.exports.getByID = (id, callback) => {
  var query = {_id: id};
  User.findById(query, callback);
};

// Query users by email address from our database
module.exports.getOne = (e, callback) => {
  var query = {email: e};
  User.findOne(query, callback);
};

// End
