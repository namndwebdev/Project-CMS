const PostModel = require("../../model/Post");
const Comment = require("../../model/Comment");

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
    let title = req.body.title;
    let content = req.body.content;
    let topic = req.body.topic;
    let user = req.body.idUser;
    let data = await PostModel.create({
      title,
      content,
      topic,
      user
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
    let post = {
      title: req.body.title,
      content: req.body.content,
      topic: req.body.topic
    };
    let result = await PostModel.updateOne(
      { _id: req.params.pid },
      {
        title: req.body.title,
        content: req.body.content,
        topic: req.body.topic
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
