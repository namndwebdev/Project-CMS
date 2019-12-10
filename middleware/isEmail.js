let UserModel = require("../model/User");
let isEmail= async (req, res, next) => {
   await UserModel.findOne({ email: req.body.email }).then((isEmail)=>{
        if(!isEmail) {
            next()
        } else { 
          res.json({message: "Email is already exist"})
        }
    });
}
module.exports = isEmail;