const connectDb = require('../configs/connectDb')
const Schema = mongoose.Schema

let AccountModel = new Schema({
  username: String,
  password: String,
  email: String,
  type: { type: String, default: 2 },
  status: { type: String, default: 'unactive' },
  idSocial: { ref: 'social' }
}, { collection: 'account' })

let Account = mongoose.model('account', AccountModel)

export default Account