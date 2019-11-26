const mongoose = require('../configs/connectDb');
const Schema = mongoose.Schema;

let PostModel = new Schema({
  title: {type:String},
  content: String,
  topic: String,
  user: [{ type: Schema.Types.ObjectId, ref:'users-permissions_user' }],
  comments:[ { type: Schema.Types.ObjectId, ref:'comment' }],
  images:[
    {type:Schema.Types.ObjectId}
  ]
}, { collection: 'post',timestamps: true  });

let Post = mongoose.model('post', PostModel);
module.exports = Post;