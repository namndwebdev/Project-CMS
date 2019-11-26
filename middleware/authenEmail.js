let router = require('express').Router();
let UserModel = require("../model/User");
let jwt = require('jsonwebtoken');
router.get("/authEmail/:eid",function(req,res,next){
    jwt.verify(req.params.eid, 'nodemy', function(err, isCorrectEmail) {
        if(!err){
            UserModel.updateOne({email: isCorrectEmail.email},{confirmed: true}).then(function(user){
              res.json("Authentication successfully");
            });    
          } else {
              res.json("false");
          }
      });
})
module.exports = router