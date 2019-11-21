const UserModel = require("../../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let getAllUser = async (req, res) => {
  try {
    let user = await UserModel.find({});
    return res.json({
      status: "Search Successfully",
      data:user
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getUser = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.uid);
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.type;
    return res.json({
      status: "Search Successfully",
      data: user
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let createUser = async (req, res) => {
  try {
    bcrypt.genSalt(saltRounds,  function(err, salt) {
      bcrypt.hash( req.body.password, salt, function(err, hash) {
        let user = {
          username: req.body.username,
          email: req.body.email,
          password: hash
        };
        UserModel.create(user).then(function(newUser) {
          return res.json({
            status: "Registry Successfully!"
          });
        });
      });
  });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateUser = async (req, res) => {
  try {
    let userEdit = {};
    if(req.body.username) user.username= req.body.username;
    if(req.body.email) user.email= req.body.email;
    if(req.body.password) username.password = req.body.password;
    let userNew = await UserModel.updateOne({ _id: req.params.uid }, { userEdit });
    if (!userNew) res.json({ status: "Can't update user" });
    else res.json({ status: "Update Succesfully!", data: userNew });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteUser = async (req, res) => {
  try {
    let user = await UserModel.findOneAndDelete({ _id: req.params.uid }).exec();
    if (!user) res.json({ status: "User not found!"});
    else res.json({ status: "Delete Succesfully!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser };
