const Complaint = require("../models/complain");
const User = require("../models/user");

const karmaPointsRanking = async (req, res) => {
  try {
    const users = await User.find().sort({ karmaPoints: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const flatStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({
      isResolved: true,
    });

    res.json({ totalComplaints, resolvedComplaints });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = { karmaPointsRanking, flatStats };
