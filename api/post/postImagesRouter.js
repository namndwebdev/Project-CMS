let formidable = require("formidable");
let express = require("express");
let router = express.Router();
let PostModel = require("../../model/Post");
router.post("/", function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/images/post/";
    form.on('fileBegin', function (key, file) {
        var newpath = form.uploadDir + file.name;
        file.path = newpath;
    })
    form.parse(req, function (err, fields, file) {
        let imagesPost = {};
        if(file.images) imagesPost.images = file.images.path;
        UserModel.findOneAndUpdate({_id:"5dd805a3f6b2d10594ce5248"},imagesPost).then(function(pathAvatar){
            res.json(imagesPost);
        });   
        res.json(file.images);
    });
});
module.exports = router;