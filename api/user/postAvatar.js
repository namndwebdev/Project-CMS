let formidable = require("formidable");
let express = require("express");
let router = express.Router();
let UserModel = require("../../model/User");
router.post("/", function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/images/avatar/";
    form.on('fileBegin', function (key, file) {
        var newpath = form.uploadDir + file.name;
        file.path = newpath;
    })
    form.parse(req, function (err, fields, file) {
        let avatarNew = {}  
        if(file.images) avatarNew.avatar = file.images.path;
        UserModel.findOneAndUpdate({_id:"5dd805a3f6b2d10594ce5248"},avatarNew).then(function(pathAvatar){
            res.json(avatarNew);
        });      
    });

});
module.exports = router;