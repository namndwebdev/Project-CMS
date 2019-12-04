const express = require("express");
const router = express.Router();
const postService = require("./postService")
const checkToken = require("../../middleware/checkToken")
router.get('/',async function(req,res,next) {
    try {
        let data = await postService.getAllPost();
         let newData= data.sort(function(a, b) {
          return new Date(a.createdAt).getTime()>new Date(b.createdAt).getTime() ? -1:1;
      });
      console.log(newData)
        return res.json({
          status: "Search Successfully",
          data
        });
      } catch (error) {
        return res.status(500).json(error);
      }
});
router.get('/:pid',async function(req,res,next) {
    try {
        let data = await postService.getPostId(req.params.pid)
        return res.json({
            status: "Search Successfully",
            data
          });
      } catch (error) {
        return res.status(500).json(error);
      }
});
router.post('/',checkToken,async function(req,res,next) {
    try {
        let newPost ={
          title:req.body.title,
          content:req.body.content,
          topic:req.body.topic,
          user:req.user
        };
        let data = await postService.createPost(newPost);
        return res.json({
          status: "Post Successfully",
          data,
        });
      } catch (error) {
        return res.status(500).json(error);
      }
});
router.put('/:pid',checkToken,async function(req,res,next) {
    try {
        let postNew = {};
        if(req.body.title) postNew.title = req.body.title;
        if(req.body.content) postNew.content = req.body.content;
        if(req.body.topic) postNew.topic = req.body.topic;
        let postEdit = await postService.updatePost(req.params.pid ,postNew);
        if (!postEdit) res.json({ status: `Can't update post`});
        else{
            let postEdited = await postService.getPostId(req.params.pid);
            res.json({ status: "update successful", data: postEdited });
        }
      } catch (error) {
        return res.status(500).json(error);
      }
});
router.delete('/:pid',checkToken,async function(req,res,next) {
    try {
        let postDelete = await postService.deletePost(req.params.pid)
        if (!postDelete) res.json({ status: `post not found!`});
        else res.json({ status: `Delete Succesfully!`  });
      } catch (error) {
        return res.status(500).json(error);
      }
});
module.exports = router;