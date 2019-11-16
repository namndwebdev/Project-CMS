var express = require("express");
var router = express.Router();
var postService = require("./postService")
router.get('/',postService.getAllPost);
router.get('/:id',postService.getPostId);
router.post('/',postService.createPost);
router.put('/:id',postService.updatePost);
router.delete('/:id',postService.deletePost);
module.exports = router;