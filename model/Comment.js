const mongoose = require('../configs/connectDb')
const Schema = mongoose.Schema

let CommentModel = new Schema({
  title: String,
  content: String,
  account: { type: Schema.Types.ObjectId, ref:'account' },
}, { collection: 'comment' })

let Comment = mongoose.model('comment', CommentModel);
module.exports = Comment