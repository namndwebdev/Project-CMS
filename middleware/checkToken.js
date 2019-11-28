// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ2NDYzNWU2Yjk4YTEyODgwMGJjMGYiLCJwcm92aWRlciI6ImxvY2FsIiwiY29uZmlybWVkIjpmYWxzZSwiYmxvY2tlZCI6ZmFsc2UsInR5cGUiOjIsInVzZXJuYW1lIjoiaGUiLCJlbWFpbCI6ImhhaGFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNmxreklGOTh1Um5yMmxoMk01akdMT2dUbnpBb2Z2Y0NIR2Yxcy5ZRGFTYzVSdTg3WVNvVnkiLCJjcmVhdGVkQXQiOiIyMDE5LTExLTIxVDA4OjA5OjI1LjgzNloiLCJ1cGRhdGVkQXQiOiIyMDE5LTExLTIxVDA4OjA5OjI1LjgzNloiLCJfX3YiOjAsImlhdCI6MTU3NDMyOTgxMX0.vtw-C9NYvi-2XDcKjPLLieMPNjQQmRkQB8c4zVLjcOw"
const jwt = require("jsonwebtoken");
var check =  function(req, res, next){
  let token = req.headers.token
   jwt.verify(token, 'doan', function(err, user) {
      if(!err){
        req.user = user.user._id;  
        next()
      }else{
       res.json("khong co token")
      }
    });  
}

module.exports = check;