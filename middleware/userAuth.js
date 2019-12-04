const passport = require('passport')
const jwt = require('jsonwebtoken');
var tokenList = {};
let postLogin = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Ban chua dang nhap!',
        user
      })
    }
    req.login(user, { session: false }, async (err) => {
      if (err) res.send(err);
      const accessToken =  await jwt.sign({user}, 'doan', { expiresIn: '60000'})
      const refreshToken = await jwt.sign({user}, 'refreshToken', { expiresIn: '3650d'})
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      tokenList[refreshToken]={accessToken,refreshToken}
      res.json({ 
        user: user,
        token:accessToken,
      refreshToken })
    })
  })(req, res)
}

module.exports = { postLogin,tokenList }