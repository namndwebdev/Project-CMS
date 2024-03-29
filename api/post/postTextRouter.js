var express = require("express");
var router = express.Router();
var postService = require("./postService")
router.get('/',postService.getAllPost);
router.get('/:pid',postService.getPostId);
router.post('/',postService.createPost);
router.put('/:pid',postService.updatePost);
router.delete('/:pid',postService.deletePost);
module.exports = router;