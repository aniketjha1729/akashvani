const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_KEY } = require("../config");
const { SECRET_REFRESH_KEY } = require("../config");

exports.genToken = (payload) => {
  const accessToken = jwt.sign(payload, SECRET_ACCESS_KEY, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY, {
    expiresIn: "1y",
  });
  return { accessToken, refreshToken };
};
