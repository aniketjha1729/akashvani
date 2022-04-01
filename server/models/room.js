const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = mongoose.Schema({
  topic: { type: String, required: true },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  speakers: {
    type: [{ type: Schema.Types.ObjectId, ref: "users" }],
    required: false,
  },
});

module.exports = Room = mongoose.model("rooms", roomSchema);
