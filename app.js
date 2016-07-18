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


//BODY-PARSER
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());



// LOGGING
app.use(morgan('dev'));
// // log to file
// var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// app.user(morgan('dev'), {stream: accessLogStream});




// REGISTER ROUTES
app.use('/api', require('./routes'));




module.exports = app;

// - authentication
// - token based
// - session
// - mysql
// - config file
// - devel and production mode
// - logging on node apps

// - error handiling
