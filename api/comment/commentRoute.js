const express = require('express')
const router = express.Router()
const commentService = require(`./commentService`)
const checkToken = require("../../middleware/checkToken");
router.get('/:pid/comment',async function(req,res,next){
    try {
        let getCommentId = await commentService.getAllComment(req.params.pid);
        res.json(getCommentId);
      } catch (error) {
        res.status(500).json(error);
      }
});
router.post('/:pid/comment',checkToken,async function(req,res,next) {
  try {
    let comment = {
      content: req.body.content,
      user: req.user,
    };
    let newComment = await commentService.createComment(comment,req.params.pid)
    res.json({
      status: "comment successfully",
      data:newComment
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put('/:pid/comment/:cid', checkToken,async function(req,res,next) {
  try {
    let newComment = {};
    if(req.body.content) newComment.content = req.body.content
   let commentEdit = await commentService.updateComment(req.params.pid,newComment,req.params.cid)
    if (!commentEdit) res.json({ status: `Can't update comment` });
    else res.json({ status: "update comment success", data: newComment });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete('/:pid/comment/:cid',checkToken,async function(req,res,next) {
   commentService.deleteComment(req.params.pid,req.params.cid)
   res.json({ status: `Delete Succesfully!` }); 
});
module.exports = router