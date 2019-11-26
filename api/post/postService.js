const PostModel = require("../../model/Post");
const Comment = require("../../model/Comment");
const User = require("../../model/User");
let getAllPost = () => {
  return  PostModel.find().populate("user",["username","email","avatar"]).populate("comments");
};
//get by id
let getPostId =  (pid) => {
  return PostModel.findById(pid).populate("user",["username","email","avatar"]).populate("comments");
};
// create post
let createPost = (newPost) => {
  return PostModel.create(newPost);
};
//   edit post
let updatePost = (pid, postNew) => {
  return  PostModel.updateOne(
    { _id:pid},
    postNew
  );
};

let deletePost = (pid) => {
  return PostModel.deleteOne({ _id: pid})
};
module.exports = {
  getAllPost,
  getPostId,
  createPost,
  updatePost,
  deletePost
};
