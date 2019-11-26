const express = require('express')
const router = express.Router()
const commentService = require(`./commentService`)
const checkToken = require("../../middleware/checkToken");
router.get('/:pid/comment',async function(req,res,next){
    try {
        let getCommentId = await commentService.getAllComment(req.params.pid);
        res.json(getCommentId.comments);
      } catch (error) {
        res.status(500).json(error);
      }
});
router.post('/:pid/comment',checkToken, commentService.createComment);
router.put('/:pid/comment/:cid', checkToken,commentService.updateComment);
router.delete('/:pid/comment/:cid',checkToken, commentService.deleteComment);
module.exports = router