const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const complainSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, require: true },
  description: { type: String, minlength: 3, maxlength: 5000 },
  complaintType: {
    type: String,
    enum: ["Noise", "Cleanliness", "Bills", "Pets", "Other"],
    required: true,
  },
  severityLevel: {
    type: String,
    enum: ["Mild", "Annoying", "Major", "Nuclear"],
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
    min: 0,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  isArchive: {
    type: Boolean,
    default: false,
  },
  karmaPoints: {
    type: Number,
    default: 0,
  },
  creator_id: {
    type: ObjectId,
    ref: "User",
    require: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complain", complainSchema);
