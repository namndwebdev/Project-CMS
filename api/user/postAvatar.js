let formidable = require("formidable");
let express = require("express");
let router = express.Router();
let UserModel = require("../../model/User");
let checkToken = require("../../middleware/checkToken");
let host = require("../../configs/config").host
router.post("/",checkToken, function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/images/avatar/";
    form.maxFileSize = 25*1024*1024;
    form.keepExtensions = true;
    form.on("error",function(message){
        return res.status(500).json("limit <25MB")
    })
    form.on('fileBegin',async function (key, file) {  
      file.path = form.uploadDir + file.name;
    })
    form.on('file',async function (key, file) {  
            var newpath = host + "images/avatar/" +file.name;
            let avatarNew = {}  
            if(file.path) avatarNew.avatar = newpath;
            await UserModel.updateOne({_id:req.user},avatarNew)
            res.json(avatarNew)
    })
    form.parse(req);
});
module.exports = router;