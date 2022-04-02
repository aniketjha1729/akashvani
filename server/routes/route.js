const express = require("express");
const router = express.Router();
const {
  signIn,
  signUp,
  currentProfile,
  logout,
} = require("../controllers/user");
const { createRoom, getAllRooms, getRoomById } = require("../controllers/room");
const { isAuth } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is  running" });
});

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/profile", isAuth, currentProfile);
router.post("/rooms", isAuth, createRoom);
router.get("/rooms", isAuth, getAllRooms);
router.get("/rooms/:roomId", isAuth, getRoomById);
router.post("/logout", logout);

module.exports = router;
