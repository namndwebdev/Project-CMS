let userAuth = require('../middleware/userAuth');
let router = require('express').Router();
const jwt = require("jsonwebtoken");
router.post('/refresh-token', async function(req,res,next) {
    let refreshTokenClient = req.body.refreshToken;
    if(refreshTokenClient && userAuth.tokenList[refreshTokenClient]){
      let jwtDecoded = await jwt.verify(refreshTokenClient,'refreshToken');
      let user = jwtDecoded.user;
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      let token = jwt.sign({user},'doan', { expiresIn: '60000'})
      res.json(token)
    }
    res.json()
}) 
module.exports = router 