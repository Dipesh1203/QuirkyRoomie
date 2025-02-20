const express = require("express");
const Complaint = require("../models/complain");
const authMiddleware = require("../utils/middleware");
const {
  topUpVoteComplains,
  voteComplain,
  solveComplain,
  listAllComplain,
  createComplain,
} = require("../controller/complain");
const router = express.Router();

// /api/complaints
router.post("/", authMiddleware, createComplain);

// /api/complaints
router.get("/", listAllComplain);

// /api/complaints/:id/resolve resolved
router.put("/:id/resolve", authMiddleware, solveComplain);

// /api/complaints/:id/vote
router.post("/:id/vote", authMiddleware, voteComplain);

// /api/complaints/trending
router.get("/trending", topUpVoteComplains);

module.exports = router;
