const mongoose = require('../configs/connectDb')
const Schema = mongoose.Schema

let AccountModel = new Schema({
    username: String,
    password: String,
    avatar: String,
    email: String,
    type:{
        type: String,
        default:2
    },
    status:{
        type: String,
        default:"active"
    }
}, { collection: 'account' })

let Account = mongoose.model('account', AccountModel);
module.exports = Account;