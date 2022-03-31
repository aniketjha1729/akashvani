const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
});

module.exports = Token = mongoose.model("tokens", tokenSchema);
