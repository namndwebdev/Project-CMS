const mongoose = require('../configs/connectDb')
const Schema = mongoose.Schema

let CommentModel = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref:'users-permissions_user' },
}, { collection: 'comment', timestamps: true })

let Comment = mongoose.model('comment', CommentModel);
module.exports = Comment