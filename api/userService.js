const UserModel = require('../model/User')

let getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find({})
    if (users.length) res.json(users)
  } catch (error) {
    console.log(error)
  }
}

let getUser = async (req, res) => {
  try {
    let uid = req.params.uid
    let user = await UserModel.findById(uid)
    if (user) res.json(user)
  } catch (error) {
    console.log(error)
  }
}

let createUser = async (req, res) => {
  try {
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    await UserModel.create(user)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
}

let updateUser = async (req, res) => {
  try {
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    let result = await UserModel
      .updateOne(
        { _id: req.params.uid },
        { username: req.body.username, email: req.body.email, password: req.body.password }
      )
    if (!result) res.json({ status: false, message: `Can't update product` })
    else res.json({ status: true, data: user })
  } catch (error) {
    console.log(error)
  }
}

let deleteUser = async (req, res) => {
  try {
    let user = await UserModel
      .findOneAndDelete({ _id: req.params.uid })
      .exec();
    if (!user) res.json({ status: false, message: `Product not found!` })
    else res.json({ status: true, message: `Delete Succesfully!` })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser }
