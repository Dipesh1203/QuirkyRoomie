const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const complainSchema = new Schema({
  _id: { type: Schema.Types.String, default: uuidv4 },
  title: { type: Schema.Types.String, require: true },
  description: { type: Schema.Types.String, minlength: 3, maxlength: 5000 },
  complaintType: {
    type: Schema.Types.String,
    enum: ["Noise", "Cleanliness", "Bills", "Pets", "Other"],
    required: true,
  },
  severityLevel: {
    type: Schema.Types.String,
    enum: ["Mild", "Annoying", "Major", "Nuclear"],
    required: true,
  },
  upvotes: {
    type: Schema.Types.Number,
    default: 0,
    min: 0,
  },
  downvotes: {
    type: Schema.Types.Number,
    default: 0,
    min: 0,
  },
  isResolved: {
    type: Schema.Types.Boolean,
    default: false,
  },
  isArchive: {
    type: Schema.Types.Boolean,
    default: false,
  },
  karmaPoints: {
    type: Schema.Types.Number,
    default: 0,
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  timestamp: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complain", complainSchema);
