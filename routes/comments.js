var express = require('express');
var Comment = require('../models/comment');
var router = express.Router({mergeParams:true});


router.route('/')
  .get(function(req, res){
    Comment.find({by: req.params.userId}, function(err, data){
      
      if (err) {
        return res.send(err);
      }
      res.json(data);
      console.log(Comment);
    });
  })
  .post(function(req, res){
    comment = new Comment(req.body);
    comment.save(function(err){
      if (err)
        return res.send(err);
      res.json({"message": "ok"});
    });
  });

// router.route('/:id')
//   .get(function(req, res){
//     Comment.findOne({_id: req.params.id},function(err, data){
//       if (err) {
//         return res.send(err);
//       }
//       res.json(data);
//     });
//   })
//   .put(function(req, res){
//     Comment.findOneAndUpdate({_id: req.params.id}, req.body, function(err, data){
//       if (err)
//         return res.send(err);
//       res.json({message: "ok"});
//     });

//   })
//   .delete(function(req, res){
//     Comment.remove({_id: req.params.id},function(err, data){
//       if (err) {
//         return res.send(err);
//       }
//       res.json({message: "ok"});
//     });
//   });

module.exports = router;

// todo 
// var express = require('express')
//   , router = express.Router()
//   , Comment = require('../models/comment')
//   , auth = require('../middlewares/auth')

// router.post('/', auth, function(req, res) {
//   user = req.user.id
//   text = req.body.text

//   Comment.create(user, text, function (err, comment) {
//     res.redirect('/')

//   })
// })
// router.get('/:id', function(req, res) {
//   Comment.get(req.params.id, function (err, comment) {
//     res.render('comments/comment', {comment: comment})
//   })
// })

// module.exports = router