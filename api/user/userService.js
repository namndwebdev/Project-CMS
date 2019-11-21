const UserModel = require("../../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find({});
    return res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getUser = async (req, res) => {
  try {
    let uid = req.params.uid;
    let user = await UserModel.findById(uid);
    return res.json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let createUser = async (req, res) => {
  try {
  

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash( req.body.password, salt, function(err, hash) {
        let user = {
          username: req.body.username,
          email: req.body.email,
          password: hash
        };
        let newUser = new UserModel(user);
        newUser.save();
        return res.json({
          status: "thanh cong",
          data: newUser,
        });
      });
  });

  
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateUser = async (req, res) => {
  try {
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    let result = await UserModel.updateOne({ _id: req.params.uid }, { user });
    if (!result) res.json({ status: false, message: `Can't update user` });
    else res.json({ status: true, data: user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteUser = async (req, res) => {
  try {
    let user = await UserModel.findOneAndDelete({ _id: req.params.uid }).exec();
    if (!user) res.json({ status: false, message: `User not found!` });
    else res.json({ status: true, message: `Delete Succesfully!` });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser };
