var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var debug = require('debug')("best_structure:app");
var config = require('./config.json')[process.env.NODE_ENV || "development"];
var morgan = require('morgan');
var app = express();




debug("app module");


// DB
var dbName = config.dbName;
var connectionString = config.connectionString + dbName;

mongoose.connect(connectionString);
// mongoose.plugin('./models/readonly');

//BODY-PARSER
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// LOGGING Api CALLS
app.use(morgan('dev'));
// // log to file
// var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// app.user(morgan('dev'), {stream: accessLogStream});


// REGISTER ROUTES
app.use('/api', require('./routes'));


//ERROR HANDLERS
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: "error",
      error: err.message,
      trace: err.stack,
      err: err
    });
    next(err);
  });
};
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
      message: "error",
      error: err.message
    });
  next(err);
});

module.exports = app;

// CONCEPTS COVERED WITH SUCCESS
// - config file
// - devel and production mode
// - basics on error handiling
// - log rest call using morgan
// - using mongoose plugins by readonly fileds functionality

// CONCEPTS TO COVER
// - authentication
// - token based
// - session
// - mysql
// - logging on node apps
// - resource doesnot exist

// - app.user(logger) on generatoer
