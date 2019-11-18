const mongoose = require('../configs/connectDb')
const Schema = mongoose.Schema

let CommentModel = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref:'users-permissions_user' },
}, { collection: 'comment' });

let Comment = mongoose.model('comment', CommentModel);
module.exports = Comment;