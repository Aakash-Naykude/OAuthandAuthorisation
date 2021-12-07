const User = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const newtoken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};
const signup = async (req, res) => {
  try {
    //check if user already exist
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user)
      return res
        .status(400)
        .json({ message: "Please provide different email", Status: "Failed" });
    // create user
    user = await User.create(req.body);
    // return token
    const token = newtoken(user);
    //return token and body
    return res.status(201).send({ user, token });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
};
const signin = async (req, res) => {
  try {
    //check mail if already exits
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        message: "Please provide correct password and email",
        Status: "Failed",
      });

    //if it matches then create token
    const match = await user.checkPassword(req.body.password);
    if (!match)
      return res.status(400).json({
        message: "Please provide correct password and email",
        Status: "Failed",
      });
    // reate token
    const token = newtoken(user);
    return res.status(200).json({ user, token });
  } catch (e) {
    return res.status(500).json({ message: e.message, Status: "Failed" });
  }
};
module.exports = { signup, signin, newtoken };
