const connectDb = require('../configs/connectDb')
const Schema = mongoose.Schema

let PostModel = new Schema({
  title: String,
  content: String,
  createAt: Number,
  editingAt: String,
  type: { type: String, default: 2 },
  status: { type: String, default: 'unactive' },
  idAccount: [{
      id : { type: Schema.Types.ObjectId ,ref: 'account' }
    }   
  ],
  idComment: [{
    id : { type: Schema.Types.ObjectId ,ref: 'comment' }
  }   
] 
}, { collection: 'post' })

let Post = mongoose.model('post', PostModel)

export default Post