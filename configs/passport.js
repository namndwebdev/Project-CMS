const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const UserModel = require('../model/User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, 
  async (email, password, done) => {
    try {
      let user = await UserModel.findOne({ email, password }).lean().exec()
        if (!user) done(null, false, { message: 'Incorrect email or password.' })
        else done(null, user, { message: 'Logged In Successfully' })
      } catch (error) {
        done(error)
      }
  }
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'doan'
},
  async (jwtPayload, done) => {
    try {
      let user = await UserModel.findById(jwtPayload._id)
        if (!user) done(null, false)
        else done(null, user)
      } catch (error) {
        done(error)
      }
  }
))

module.exports = passport