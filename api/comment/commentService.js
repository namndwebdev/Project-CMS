const CommentModel = require(`../../model/Comment`);
const UserModel = require("../../model/User");
const PostModel = require("../../model/Post");
// lay tat ca comment cua 1 bai viet
let getAllComment = (pid) => {
  return  PostModel.findById(pid).populate("comments").populate('user',["username","email","avatar"])
};

let createComment =  async (comment,pid) => {
  let newComment = await CommentModel.create(comment);
 await PostModel.updateOne({ _id: pid },
   { $push: { comments: newComment._id } }
   );
   return newComment;
};

let updateComment = async (pid,newComment,cid) => {
  let commentEdit = await CommentModel.updateOne(
    { _id: cid },
    newComment 
  );
 await  PostModel.updateOne({ _id: pid },
    { $push: { comments: commentEdit._id } }
    );
    return commentEdit;
};

let deleteComment = async (pid,cid) => {
 await CommentModel.deleteOne({ _id:cid });
  await PostModel.updateOne({_id:pid});
};

module.exports = {
  getAllComment,
  createComment,
  updateComment,
  deleteComment
};
