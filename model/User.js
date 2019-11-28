const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const host = require('../configs/config').host;
// const bcrypt = require('bcrypt');

let UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  provider: { type: String, default: `local` },
  confirmed: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  type: { type: Number, default: 2 },
  avatar: {
    type: String,
    default:`${host}images/avatar/user.jpg`
  }
}, { collection: `users-permissions_user`, timestamps: true });

let UserModel = mongoose.model(`users-permissions_user`, UserSchema);

// UserModel.prototype.hashPassword = function() {
//   this.password = bcrypt.hashSync(this.password, 10);
// }

module.exports = UserModel