/*
============================================
; Title:  app.js
; Author: Jake Seever
; Date:   05 May 2019
; Description: Configuration File
;===========================================
*/

// Start

var config = {};

config.web = {};

config.web.port = process.env.PORT||'3000';

config.web.secret = 'topsecret';

module.exports = config;

// End

