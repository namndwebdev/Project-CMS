const PostModel = require("../../model/Post");
const Comment = require("../../model/Comment");
const User = require("../../model/User");
let getAllPost = async (req, res) => {
  try {
    let data = await PostModel.find()
      .populate("user")
      .populate("comments");
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//get by id
let getPostId = async (req, res) => {
  try {
    let postId = req.params.pid;
    let data = await PostModel.findById(postId)
      .populate("user")
      .populate("comments");
    return res.json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};
// create post
let createPost = async (req, res) => {
  try {
    let data = await PostModel.create({
      title:req.body.title,
      content:req.body.content,
      topic:req.body.topic,
      user:req.body.idUser
    });
    return res.json({
      status: "Dang thanh cong",
      data
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
//   edit post
let updatePost = async (req, res) => {
  try {
    let post = {};
    if(req.body.title) post.title = req.body.title;
    if(req.body.content) post.content = req.body.content;
    if(req.body.topic) post.topic = req.body.topic;
    let result = await PostModel.updateOne(
      { _id: req.params.pid },
      post
    );
    if (!result) res.json({ status: false, message: `Can't update post` });
    else res.json({ status: true, data: post });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deletePost = async (req, res) => {
  try {
    let id = req.params.pid;
    let post = await PostModel.findOneAndDelete({ _id: id }).exec();
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
};
