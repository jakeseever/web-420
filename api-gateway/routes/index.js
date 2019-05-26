/*
============================================
; Title:  index.js
; Author: Jake Seever
; Date:   05 March 2019
; Description: THe index page route/requirements.
;===========================================
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
