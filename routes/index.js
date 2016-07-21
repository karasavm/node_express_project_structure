var express = require('express');
var Comment = require('../models/comment');
var User = require('../models/user');

var router = express.Router();



router.use('/users', require('./users'));
router.use('/users/:userId/comments/',  require('./comments'));



module.exports = router;