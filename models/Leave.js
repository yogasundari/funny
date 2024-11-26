const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    username: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", LeaveSchema);
