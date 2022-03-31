const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controllers/user");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is  running" });
});

router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;
