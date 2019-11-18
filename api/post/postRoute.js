const express = require("express");
const router = express.Router();
const postService = require("./postService")

router.get('/',postService.getAllPost);
router.get('/:pid',postService.getPostId);
router.post('/',postService.createPost);
router.put('/:pid',postService.updatePost);
router.delete('/:pid',postService.deletePost);

module.exports = router;