let UserModel = require("../model/User");
let router = require("express").Router();
router.post("/",  (req, res, next) => {
    UserModel.findOne({ email: req.body.email }).then((isEmail)=>{
        if (isEmail) {
            res.json({
                message: "Email is already exist"
            })
        } else {
            res.json({
                message: "Email create successfully"
            })
        }
    });
   
})
module.exports = router;