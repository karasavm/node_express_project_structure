var express = require('express');
var User = require('../models/user');

var router = express.Router();


router.route('/')
  .get(function(req, res, next){
    
    User.find(function(err, data){
      // err = new Error("unexpected")
      
      if (err) {
        // console.log("errrrrrrrrrr")  /
        return next(err);
      }
      res.json(data);
      
    });
  })
  .post(function(req, res, next){
    user = new User(req.body);
    
    
    // user.isLevelAllowed(function (err, allowed) {
    //   if (allowed) {
    //       console.log('Allowed');
    //   } else {
    //       console.log('Not Allowed');
    //   }
    // });

    // User.findAllByAge(10, function(err, data){
    //   console.log(data);
    // });

    user.save(function(err){
      if (err){
        console.log(err);
        return next(err);
        // return res.send(err)
      }
      console.log("Done!");

      res.json({"message": "ok"});
    });

  });

router.route('/:id')
  .get(function(req, res, next){
    User.findOne({_id: req.params.id},function(err, data){
      if (err) {
        return next(err);
      }
      
      res.json(data);
    });
  })
  .put(function(req, res, next){
    
    // exclude readonly fields.
    User.findOneAndUpdate({_id: req.params.id}, User.excludeFields(req.body), function(err, data){
      if (err)
        next(err);
      res.json({message: "ok"});
    });

  })
  .delete(function(req, res, next){
    User.remove({_id: req.params.id},function(err, data){
      if (err) {
        return next(err);
      }
      res.json({message: "ok"});
    });
  });

module.exports = router;