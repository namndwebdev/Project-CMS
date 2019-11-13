const connectDb = require('../configs/connectDb')
const Schema = mongoose.Schema

let CommentModel = new Schema({
  content: String,
  createAt: Date,
  editingAt: Date,
  type: { type: String, default: 2 },
  status: { type: String, default: 'unactive' },
  idAccount: [{
      id : { type: Schema.Types.ObjectId ,ref: 'account' }
    }   
  ] 
}, { collection: 'comment' })

let Comment = mongoose.model('comment', CommentModel)

export default Comment