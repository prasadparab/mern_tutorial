const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToke");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log("req received");
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, pic, password });
  if (user) {
    console.log(user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("user create successfully !!");
  } else {
    res.status(400);
    throw new Error("failed to create new user");
  }
});

const authoriseUser = async (req, res) => {
  console.log("authorising user", typeof req.body);
  const { email, password } = req.body;
  console.log("authorising user", email);
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    const x = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    };
    console.log(x);
    res.json(x);
    console.log("user logged in sucessfully");
  } else {
    res.status(401).json({ msg: "Login Failed", statusCode: 401 });
    console.log("login failed");
    //throw new Error("Login Failed");
  }
};

const updateProfile = async (req, res) => {
  console.log("updating user profile");
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password && req.body.password.length) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
    console.log("user updated successfully");
    return;
  }
  res.status(404).json({ msg: "User not found" });
};

module.exports = { registerUser, authoriseUser, updateProfile };
