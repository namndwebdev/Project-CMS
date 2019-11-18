const mongoose = require('../configs/connectDb');
const Schema = mongoose.Schema;

let PostModel = new Schema({
  title: {type:String,require: true, unique: true,sparse:true},
  content: String,
  topic: String,
  user: [{ type: Schema.Types.ObjectId, ref:'users-permissions_user' }],
  comments:[ { type: Schema.Types.ObjectId, ref:'comment' }]
}, { collection: 'post' });

let Post = mongoose.model('post', PostModel);
module.exports = Post;