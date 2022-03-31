const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { genToken } = require("../services/generateToken");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User does not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const { accessToken, refreshToken } = genToken({ _id: user._id });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ msg: "User already exists" });
    }
    const newUser = new User({
      email,
      password,
      name,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err, user) => {
          res.status(200).json({ msg: "Signup Success", user });
        });
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
