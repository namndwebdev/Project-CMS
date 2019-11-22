const express = require('express')
const router = express.Router()
const commentService = require(`./commentService`)
const checkToken = require("../../middleware/checkToken");
router.get('/:pid/comment', commentService.getAllComment);
router.post('/:pid/comment',checkToken, commentService.createComment);
router.put('/:pid/comment/:cid', checkToken,commentService.updateComment);
router.delete('/:pid/comment/:cid',checkToken, commentService.deleteComment);
module.exports = router