const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const staffRoute = require("./routes/staff");
const authRoute = require("./routes/auth");
const leaveRoute = require("./routes/leave");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// CORS setup
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log(err));

app.use(express.json()); // To parse JSON requests

// Routes
app.use("/api/staff", staffRoute);
app.use("/api/auth", authRoute);
app.use("/api/leave", leaveRoute);

app.use(errorHandler);
app.listen(4000, () => {
  console.log("Backend server is running on port 4000");
});
