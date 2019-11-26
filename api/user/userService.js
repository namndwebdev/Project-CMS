const UserModel = require("../../model/User");
let getAllUser = () => {
 return UserModel.find({},{username: 1,email:1,avatar:1,blocked:1,confirmed:1});
};
let getUser =  (id) => {
 return UserModel.findById(id,{username: 1,email:1,avatar:1,blocked:1,confirmed:1});
};
let createUser = (userNew) => {
  return UserModel.create(userNew);
};
let updateUser =  (uid, userEdit) => {
  return UserModel.updateOne({ _id: uid }, userEdit,{username: 1,email:1,avatar:1,blocked:1,confirmed:1} );
};
let deleteUser =  (uid) => {
  return UserModel.deleteOne({ _id:  uid}).exec()
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser };
