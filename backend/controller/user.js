const User = require("../models/user.js");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();

const signup = async (req, res) => {
  try {
    const { username, email, password, flat_code } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword, flat_code });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid username" });

    const check = await bcrypt.compare(password, user.password);
    if (!check) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
module.exports = { login, signup };
