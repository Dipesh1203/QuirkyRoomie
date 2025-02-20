const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Schema.Types.String, default: uuidv4 },
  username: { type: Schema.Types.String, unquie: true, required: true },
  flate_code: { type: Schema.Types.ObjectId, ref: "flate_group" },
  password: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, unique: true, required: true },
});

module.exports = mongoose.model("User", userSchema);
