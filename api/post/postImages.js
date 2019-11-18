var formidable = require("formidable");
var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
router.post("/", function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "public/images/post/";
    form.on('fileBegin', function (key, file) {
        var newpath = form.uploadDir + file.name;
        file.path = newpath;
    })
    form.parse(req, function (err, fields, file) {
        res.json(file.images);
    });

});
module.exports = router;