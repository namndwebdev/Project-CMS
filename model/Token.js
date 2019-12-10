const mongoose = require('../configs/connectDb');
const Schema = mongoose.Schema;
let TokenModel = new Schema({
  refreshToken: String,
  user: Schema.Types.ObjectId
}, { collection: 'token',timestamps: true  });
let Token = mongoose.model('token', TokenModel);
module.exports = Token;