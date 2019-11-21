const express = require("express");
const router = express.Router();
const postService = require("./postService")
const checkToken = require("../../middleware/checkToken")
router.get('/',postService.getAllPost);
router.get('/:pid',postService.getPostId);
router.post('/',checkToken,postService.createPost);
router.put('/:pid',checkToken,postService.updatePost);
router.delete('/:pid',checkToken,postService.deletePost);

module.exports = router;