const Complaint = require("../models/complain");

const createComplain = async (req, res) => {
  try {
    const { title, description, complaintType, severityLevel } = req.body;

    const newComplaint = new Complaint({
      title,
      description,
      complaintType,
      severityLevel,
      creator_id: req.user.userId,
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const listAllComplain = async (req, res) => {
  try {
    const complaints = await Complaint.find({ isResolved: false }).sort({
      timestamp: -1,
    });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const solveComplain = async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, { isResolved: true });
    res.json({ msg: "Complaint resolved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const voteComplain = async (req, res) => {
  try {
    const { vote } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    if (vote === "upvote") complaint.upvotes += 1;
    else if (vote === "downvote") complaint.downvotes += 1;

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const topUpVoteComplains = async (req, res) => {
  try {
    const trendingComplaints = await Complaint.find()
      .sort({ upvotes: -1 })
      .limit(5);
    res.json(trendingComplaints);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  createComplain,
  listAllComplain,
  solveComplain,
  voteComplain,
  topUpVoteComplains,
};
