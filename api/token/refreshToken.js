
let router = require('express').Router();
let jwtHelps = require("./jwtHelps");
let TokenModel = require("../../model/Token")
router.post('/refresh-token', async function(req,res,next) {
    let refreshTokenClient = req.body.refreshToken;
    if(refreshTokenClient){
      try {
       let user = await jwtHelps.verifyToken(refreshTokenClient,'refreshToken');     
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        let checkRefreshToken = await TokenModel.find({ user: user.user._id, refreshToken: refreshTokenClient });
        if(checkRefreshToken.length>0){
          let accessToken = await  jwtHelps.generateToken({user},'doan', '60000');
          res.status(200).json(accessToken)
        }else{
          res.status(403).json({
            message:"refresh token expired"
          })
        }
      } catch (error) {
        if(error.message=='jwt expired'){
          res.status(403).json({
            message:"refresh token expired"
          })
        }else{
          res.status(403).json({
            message:"refresh token invalid"
          })
        }
      }
    }else{
      res.status(403).json({message:'no refresh token provided'})
    }
}) 
module.exports = router 