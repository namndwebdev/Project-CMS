const CommentModel = require(`../../model/Comment`);
const UserModel = require("../../model/User");
const PostModel = require("../../model/Post");

// lay tat ca comment cua 1 bai viet
let getAllComment = async (req, res) => {
  try {
    let pid = req.params.pid;
    let getCommentId = await PostModel.findById({ _id: pid }).populate("comments");
    res.json(getCommentId.comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

let createComment = async (req, res) => {
  try {
    let comment = {
      content: req.body.content,
      user: req.body.idUser,
    };
    let newComment = await CommentModel.create(comment);
    let data = await PostModel.update({ _id: req.params.pid },
      { $push: { comments: newComment._id } }
      );
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

let updateComment = async (req, res) => {
  try {
    let comment = {
      content: req.body.content
    };
    let result = await CommentModel.updateOne(
      { _id: req.params.cid },
      { comment }
    );
    if (!result) res.json({ status: false, message: `Can't update comment` });
    else res.json({ status: true, data: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

let deleteComment = async (req, res) => {
  try {
    let comment = await CommentModel.findOneAndDelete({ _id: req.params.cid });
    if (!comment) res.json({ status: false, message: `User not found!` });
    else res.json({ status: true, message: `Delete Succesfully!` });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllComment,
  createComment,
  updateComment,
  deleteComment
};
