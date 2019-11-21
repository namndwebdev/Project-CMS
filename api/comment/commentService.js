const CommentModel = require(`../../model/Comment`);
const UserModel = require("../../model/User");
const PostModel = require("../../model/Post");
// lay tat ca comment cua 1 bai viet
let getAllComment = async (req, res) => {
  try {

    let getCommentId = await PostModel.findById(req.params.pid).populate("comments");
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
     await PostModel.updateOne({ _id: req.params.pid },
      { $push: { comments: newComment._id } }
      );
    res.json({
      status: "comment successfully",
      data:newComment
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let updateComment = async (req, res) => {
  try {
    let newComment = {};
    if(req.body.content) newComment.content = req.body.content
    let commentEdit = await CommentModel.updateOne(
      { _id: req.params.cid },
      { newComment }
    );
    await PostModel.updateOne({ _id: req.params.pid },
      { $push: { comments: newComment._id } }
      );
    if (!commentEdit) res.json({ status: `Can't update comment` });
    else res.json({ status: "update comment success", data: newComment });
  } catch (error) {
    res.status(500).json(error);
  }
};

let deleteComment = async (req, res) => {
  try {
    let commentDelete = await CommentModel.findOneAndDelete({ _id: req.params.cid });
    if (!commentDelete) res.json({ status: `Comment not found!`});
    else res.json({ status: `Delete Succesfully!` });
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
