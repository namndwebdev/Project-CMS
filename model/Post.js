const mongoose = require('../configs/connectDb')
const Schema = mongoose.Schema

let PostModel = new Schema({
  title: {type:String,require: true, unique: true,sparse:true},
  content: String,
  Topic: String,
  account: [{ type: Schema.Types.ObjectId, ref:'account' }],
  comments:[ { type: Schema.Types.ObjectId, ref:'comment' }]
}, { collection: 'post' })

let Post = mongoose.model('post', PostModel);
module.exports = Post;