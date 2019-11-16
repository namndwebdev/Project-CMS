const PostModel = require("../../model/Post");
const Comment = require("../../model/Comment");
const Account = require("../../model/Account");
let getAllPost = async (req, res) => {
    try {
      let data = await  PostModel.find().populate("account").populate("comments");
      return res.json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
};
//get by id
let getPostId = async (req, res) => {
    try {
     let postId = req.params.id;
      let data = await  PostModel.findById(postId).populate("account").populate("comments");
      return res.json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
};
// create post
let createPost = async (req, res) => {
    try {
    var title=req.body.title
    var content= req.body.content
      var Topic= req.body.topic
      var  account= req.body.idAccount
     var data = await PostModel.create({
            title,content,Topic,account
      });
      return res.json({
          status:'Dang thanh cong',
          data
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
//   edit post

let updatePost = async (req, res) => {
    try {
      let post = {
        title: req.body.title,
        content: req.body.content,
        Topic: req.body.topic,
      };
      let result = await PostModel.updateOne(
        { _id: req.params.id },
        {
            title: req.body.title,
            content: req.body.content,
            Topic: req.body.topic,
        }
      );
      if (!result) res.json({ status: false, message: `Can't update post` });
      else res.json({ status: true, data: post });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
let deletePost = async (req, res) => {
    try {
        var id =  req.params.id;
      let post = await PostModel.findOneAndDelete({ _id:id}).exec();
      if (!post) res.json({ status: false, message: `post not found!` });
      else res.json({ status: true, message: `Delete Succesfully!` });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
module.exports = {
    getAllPost,
    getPostId,
    createPost,
    updatePost,
    deletePost
}