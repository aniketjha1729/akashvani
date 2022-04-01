const Room = require("../models/room");
const RoomDto = require("../dtos/rooms");

exports.createRoom = async (req, res) => {
  const { topic } = req.body;
  try {
    if (!topic) {
      return res.status(400).json({ msg: "Topic Requied" });
    }
    const newRoom = await Room.create({
      topic,
      ownerId: req.user._id,
      speakers: req.user._id,
    });
    return res.status(200).json(new RoomDto(newRoom));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("speakers")
      .populate("ownerId")
      .exec();
    if (!rooms) {
      return res.status(404).json({ msg: "No Rooms Available" });
    }
    const allRooms = rooms.map((room) => new RoomDto(room));
    return res.status(200).json(allRooms);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
