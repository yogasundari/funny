const router = require("express").Router();
const Leave = require("../models/Leave");

// Create leave request
router.post("/", async (req, res) => {
  try {
    const newLeave = new Leave({
      username: req.body.username,
      leaveType: req.body.leaveType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    });

    const savedLeave = await newLeave.save();
    res.status(200).json(savedLeave);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all leaves for a user
router.get("/:userId", async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.params.userId });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a leave request
router.delete("/:id", async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.status(200).json("Leave request deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
