const express = require("express");
const { karmaPointsRanking, flatStats } = require("../controller/stats");
const router = express.Router();

// /api/leaderboard
router.get("/leaderboard", karmaPointsRanking);

// /api/flat/stats
router.get("/flat/stats", flatStats);

module.exports = router;
