const passport = require('passport')
const jwt = require('jsonwebtoken')
let postLogin = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Ban chua dang nhap!',
        user
      })
    }
    req.login(user, { session: false }, err => {
      if (err) res.send(err);
      const token = jwt.sign({user}, 'doan', { expiresIn: 3600*60 })
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      res.json({ 
        user: user,
        token })
    })
  })(req, res)
}

module.exports = { postLogin }