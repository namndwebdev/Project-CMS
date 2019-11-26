const router = require('express').Router()
const userService = require('./userService')
const checkToken = require("../../middleware/checkToken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const isEmail = require("../../middleware/isEmail")
let nodemailer = require("nodemailer");
let configPassword = require("../../configs/configEmail");
let jwt = require('jsonwebtoken');
router.get('/',async function(req,res,next){
    try {
        let user = await userService.getAllUser();
        return res.json({
          status: "Search Successfully",
          data:user
        });
      } catch (error) {
        return res.status(500).json(error);
      }
})
router.get('/:uid',async function(req,res,next) {
    try {
        let user = await userService.getUser(req.params.uid);
        
        return res.json({
          status: "Search Successfully",
          data: user
        });
      } catch (error) {
        return res.status(500).json(error);
      }
})
// sign in
router.post('/',isEmail, function(req,res,next){
    try {
        let token =  jwt.sign({email:req.body.email}, 'nodemy',{expiresIn:"2 days"});
          let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth:{
                  user:"voicoiloichoi@gmail.com",
                  pass: configPassword.password
              }
          })
          let mailOptions = {
              from:"voicoiloichoi@gmail.com",
              to:`${req.body.email}`,
              subject:"Thu xac thuc",
              html:`<p>Link nay ton tai trong 2 ngay, xac thuc <a href="${req.protocol + '://' + req.get('host')}/authEmail/${token}">Tai day</a></p>`
          }
          transporter.sendMail(mailOptions, function(err,data) {
              if(err){
                  res.json(err)
              }
          })  
        bcrypt.genSalt(saltRounds,  function(err, salt) {
          bcrypt.hash( req.body.password, salt,async function(err, hash) {
            let newUser = {
              username: req.body.username,
              email: req.body.email,
              password: hash
            };
           await userService.createUser(newUser);
              return res.json({
                status: "Registry Successfully!"
              });
          });
      });
      } catch (error) {
        return res.status(500).json(error);
      }
})
// update user
router.put('/:uid',checkToken, async function(req,res,next){
    try {
        let userEdit = {};
        if(req.body.username) userEdit.username= req.body.username;
        if(req.body.email) userEdit.email= req.body.email;
        if(req.body.password) userEdit.password = req.body.password;
        let userNew = await userService.updateUser(req.params.uid,userEdit);
        if (!userNew) res.json({ status: "Can't update user" });
        else {
            let userNewed = await userService.getUser(req.params.uid);
            delete userNewed.password;
            delete userNewed.createdAt;
            delete userNewed.updatedAt;
            delete userNewed.type;
            res.json({ status: "Update Succesfully!", data: userNewed });
        }
      } catch (error) {
        return res.status(500).json(error);
      }
}) 
// delete user
router.delete('/:uid', checkToken,async function(req,res,next) {
    try {
        let user = await userService.deleteUser(req.params.uid) ;
        if (!user) res.json({ status: "User not found!"});
        else res.json({ status: "Delete Succesfully!" });
      } catch (error) {
        return res.status(500).json(error);
      }
})
module.exports = router