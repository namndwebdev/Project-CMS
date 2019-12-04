
const jwt = require("jsonwebtoken");
var check =  async function(req, res, next){
  let token = req.headers.token
  var decoded = await jwt.verify(token, 'doan');  
    if(decoded){
      req.user = decoded.user._id;  
      next()
    }else{
      res.json({messages:"unauthorized"})
    }
}

module.exports = check;