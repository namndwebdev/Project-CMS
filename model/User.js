const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserModel = new Schema({
  username: String,
  email: String,
  password: String,
  type: { type: Number, default: 2 }
}, { collection: 'user' })

let User = mongoose.model(`user`, UserModel)

module.exports = User