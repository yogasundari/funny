const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");
const verifyToken = require("../middleware/authMiddleware");

// Register user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new Staff({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const user = await Staff.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("User not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: user._id,username: user.username}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Generated JWT Token:", token);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

module.exports = router;
