const jwt = require("jsonwebtoken");
//create token
let generateToken = (user, secretKeyToken, tokenLife) => {
    return new Promise((resolve, reject) => {
      // Thực hiện ký và tạo token
      jwt.sign({user},secretKeyToken,{
          expiresIn: tokenLife,
        },
        function(error, token){
          if (error) {
            return reject(error);
          }
          resolve(token);
      });
    });
  }
//verity token
let verifyToken = (token, secretKeyRefreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKeyRefreshToken, function(error, decoded){
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }
  module.exports = {
    generateToken,
    verifyToken,
  };