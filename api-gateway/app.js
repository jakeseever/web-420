/*
============================================
; Title:  app.js
; Author: Jake Seever
; Date:   05 May 2019
; Description: 1.4 RESTful API assignment
;===========================================
*/

// Start

// Require Statements

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.promise = require('bluebird');

var indexRouter = require('./routes/index');
var apiCatalog = require('./routes/api-catalog');
//var usersRouter = require('./routes/users');

var app = express();

// Database connection

/**
 * mongoose.connect()
 */
mongoose.connect('mongodb+srv://admin:admin@ems-ap5nb.mongodb.net/api-gateway?retryWrites=true',
{
  promiseLibrary: require('bluebird')
}).then(()=>console.log('Connection Successful'))
.catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiCatalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// End
