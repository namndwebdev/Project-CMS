let jwtHelps = require("../api/token/jwtHelps")
var check =  async function(req, res, next){
  let token = req.headers.token
  if(token){
      jwtHelps.verifyToken(token,'doan').then(function(user){
        req.user = user._id;
        next();
      }).catch(err=>{
        if(err.message=='jwt expired'){
          res.status(403).json({
            message:"token expired"
          })
        }else{
          res.status(403).json({
            message:"token invalid"
          })
        }
       
      })
  }else{
    res.status(403).json({
      message:"no token provided" 
    })
  }
}

module.exports = check;