let formidable = require("formidable");
let express = require("express");
let router = express.Router();
let UserModel = require("../../model/User");
let checkToken = require("../../middleware/checkToken")
router.post("/",checkToken, function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    var maxSize = 25*1024*1024; // 3MB
    form.uploadDir = "public/images/avatar/";
    // form.on('error', function(message) {
    //     if(message)
    //     {
    //         res.json({err: message});
    //     }
    //     else
    //     {
    //         res.json({err: 'Upload error, please try again'});
    //     }
    // });
    form.on('fileBegin', function (key, file) {  
        if(form.bytesExpected > maxSize){
            res.json('Size must not be over 25MB');
        } else{
            var type = file.type;
            type = type.split('/');
            type = type[1];
            if(type != 'jpeg' && type != 'png' && type != 'gif')
            {
                res.json('error', "JPG's, PNG's, GIF's only");
            }
        }
    })
    form.parse(req, async function (err, fields, file) {
        var newpath = form.uploadDir + file.name;
        file.path = newpath;
        let avatarNew = {}  
        if(file.images) avatarNew.avatar = file.images.path;
       await UserModel.updateOne({_id:req.user},avatarNew).exec().then(function(pathAvatar){
            res.json(avatarNew);
        });      
    });

});
module.exports = router;