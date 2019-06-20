/*
============================================
; Title:  check-token.js
; Author: Jake Seever
; Date:   20 June 2019
; Description: A file to check the token.
;===========================================
*/

// Start

// Require Statements
var jwt = require('jsonwebtoken');
var config = require('./config');

/**
 * Check the HTTP header for a valid JSON web token.
 * @param req
 * @param res
 * @param next
 */
 function checkToken(req, res, next) {

  var token = req.headers['x-access-token'];

  if(!token)
    return res.status(403).send({auth: false, message: 'No token was provided.'});

    jwt.verify(token, config.web.secret, function(err, decoded){
      if(err) return res.status(500).send({ auth:false, message: 'Failed to authenticate the token'});

      req.userId = decoded.id;
      next();
    });
 }

 module.exports = checkToken;

 // End
