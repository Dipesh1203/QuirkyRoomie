const express = require("express");
const router = express.Router();
const { login, signup } = require("../controller/user");

// /api/auth/register
router.post("/register", signup);

// /api/auth/login
router.post("/login", login);

module.exports = router;
