const express = require("express");
const router = express.Router();
const { signIn, signUp, currentProfile } = require("../controllers/user");
const { createRoom, getAllRooms } = require("../controllers/room");
const { isAuth } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is  running" });
});

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/profile", isAuth, currentProfile);
router.post("/rooms", isAuth, createRoom);
router.get("/rooms", isAuth, getAllRooms);

module.exports = router;
