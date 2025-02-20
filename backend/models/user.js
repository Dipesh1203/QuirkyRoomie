const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  username: { type: String, unquie: true, required: true },
  flate_code: { type: ObjectId, ref: "flate_group" },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("User", userSchema);
