const express = require("express");
const Complaint = require("../models/complain");
const { authorize } = require("../utils/middleware");
const {
  topUpVoteComplains,
  voteComplain,
  solveComplain,
  listAllComplain,
  createComplain,
} = require("../controller/complain");
const router = express.Router();

// /api/complaints
router.post("/", authorize, createComplain);

// /api/complaints
router.get("/", listAllComplain);

// /api/complaints/:id/resolve resolved
router.put("/:id/resolve", authorize, solveComplain);

// /api/complaints/:id/vote
router.post("/:id/vote", authorize, voteComplain);

// /api/complaints/trending
router.get("/trending", topUpVoteComplains);

module.exports = router;
