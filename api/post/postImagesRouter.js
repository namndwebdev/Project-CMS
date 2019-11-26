let formidable = require("formidable");
let express = require("express");
let router = express.Router();
let PostModel = require("../../model/Post");
let checkToken = require("../../middleware/checkToken")
router.post("/",checkToken, function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    var maxSize = 25*1024*1024; // 25MB
    form.uploadDir = "public/images/post/";
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
        let imagesPost = {};
        if(file.images) imagesPost.images = file.images.path;
      await  UserModel.updateOne({_id:req.user},imagesPost).then(function(pathAvatar){
            res.json(imagesPost);
        });   

    });
});
module.exports = router;