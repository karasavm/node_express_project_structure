var express = require('express');
var User = require('../models/user');

var router = express.Router();


router.route('')
  .get(function(req, res){
    User.find(function(err, data){
      
      if (err) {
        return res.send(err);
      }
      res.json(data);
    });
  })
  .post(function(req, res){
    user = new User(req.body);

    user.save(function(err){
      if (err)
        return res.send(err);
      res.json({"message": "ok"});
    });
  });

router.route('/:id')
  .get(function(req, res){
    User.findOne({_id: req.params.id},function(err, data){
      if (err) {
        return res.send(err);
      }
      res.json(data);
    });
  })
  .put(function(req, res){
    User.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
      if (err)
        return res.send(err);
      res.json({message: "ok"});
    });

  })
  .delete(function(req, res){
    User.remove({_id: req.params.id},function(err, data){
      if (err) {
        return res.send(err);
      }
      res.json({message: "ok"});
    });
  });

module.exports = router;