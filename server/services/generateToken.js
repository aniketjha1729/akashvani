const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_KEY } = require("../config");
const { SECRET_REFRESH_KEY } = require("../config");
const Token = require("../models/token");

exports.genToken = (payload) => {
  const accessToken = jwt.sign(payload, SECRET_ACCESS_KEY, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY, {
    expiresIn: "1y",
  });
  return { accessToken, refreshToken };
};

exports.saveToken = async (token, userId) => {
  try {
    const newToken = new Token({
      token,
      userId,
    });
    await newToken.save();
  } catch (err) {
    console.log(err);
  }
};

exports.verifyToken = async (token) => {
  return jwt.verify(token, SECRET_ACCESS_KEY);
};
