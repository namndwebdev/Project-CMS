const router = require('express').Router()
const passport = require('passport')
const jwtHelps = require('../token/jwtHelps');
const TokenModel = require('../../model/Token.js')
router.post('/',function(req,res,next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: `You haven't login!`,
            user
          })
        }
        req.login(user, { session: false }, async (err) => {
          if (err) res.send(err);
          let accessToken =  await jwtHelps.generateToken(user, 'doan',"60000");
          let refreshToken = await jwtHelps.generateToken(user,'refreshToken',"3650d");
          let findRefreshToken = await TokenModel.find({user:user._id});
          if(findRefreshToken[0].refreshToken){
             try {
               TokenModel.updateOne({user:user._id},{refreshToken}).exec();
             } catch (error) {
               res.json({message: 'refresh token expired'});
             }
          }else{
             TokenModel.create({refreshToken,user:user._id});
          }
          delete user.password;
          delete user.createdAt;
          delete user.updatedAt;
          res.json({ 
            user: user,
            token:accessToken,
            refreshToken 
          })
        })
      })(req, res)
})
module.exports =  router 