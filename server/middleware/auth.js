const { verifyToken } = require("../services/generateToken");

exports.isAuth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = await verifyToken(accessToken);
    if (!userData) {
      throw new Error();
    }
    req.user = userData;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Not authenticated" });
  }
};
