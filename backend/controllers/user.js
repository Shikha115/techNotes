const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//=========== get all users ============
const getAllUsers = asyncHandler(async (req, res) => {
  // const user = await User.find({}, '-password -email'); or
  const user = await User.find({}).select("-password").lean(); //lean makes query run faster, used when we don't need to modify the data

  if (!user?.length) {
    return res.status(400).json({
      status: "failure",
      msg: "There are currently no user in database",
      data: error.message,
    });
  }
  res
    .status(200)
    .json({ status: "success", msg: "Retrieved users", data: user });
});

//=============== create a user ===============
const createAUser = asyncHandler(async (req, res) => {
  const { username, password, roles, active } = req.body;

  //comfirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res
      .status(400)
      .json({ status: "failed", message: "All Fields are required" });
  }

  //check dulplicate
  const duplicate = await User.findOne({ username }).lean().exec(); // exec = returns a promise
  if (duplicate) {
    return res
      .status(409)
      .json({ status: "failed", message: "User already exist" });
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new User({
    //or User.create()
    username,
    password: hash,
    roles,
    active,
  });
  await user.save();

  //user couldn't be saved
  if (!user) {
    return res.status(500).json({
      status: "failed",
      msg: "Couldn't create user",
      data: error.message,
    });
  }

  res.status(200).json({ status: "success", msg: "user created", data: user });
});

//============== update a user ===============
const updateAUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;

  //comfirm data
  if (
    !id ||
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ status: "failed", message: "All Fields are required" });
  }

  //find user
  const user = await User.findById(id).exec();

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }

  //is duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== id) {
    return res
      .status(409)
      .json({ status: "failed", message: "Username already exist" });
  }

  //hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  user.username = username;
  user.password = hash;
  user.roles = roles;
  user.active = active;

  const updatedUser = await user.save();

  if (!updatedUser) {
    return res
      .status(500)
      .json({ status: "failed", message: "Couldn't update user" });
  }

  res.json({
    status: "success",
    message: "updated user",
    data: updatedUser,
  });
});

//============== delete a user ===============
const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ status: "failed", message: "id is required" });
  }

  //if no notes is under a user then delete the user
  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes) {
    return res
      .status(400)
      .json({ status: "failed", message: "User has notes" });
  }
  //delete user
  const user = await User.findByIdAndDelete(id).lean().exec();
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }
  res.json({ status: "success", message: "User deleted", data: user });
});

module.exports = { getAllUsers, createAUser, updateAUser, deleteAUser };
