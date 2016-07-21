var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var User = require('./user');

var schema = new Schema({
  text: String,
  created_at: {type: Date, default: Date.now},
  by: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  
});

module.exports = mongoose.model('Comment', schema);