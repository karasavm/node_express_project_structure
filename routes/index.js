var express = require('express');
var Comment = require('../models/comment');
var User = require('../models/user');

var router = express.Router();




router.use('/comments', require('./comments'));
router.use('/users', require('./users'));


module.exports = router;