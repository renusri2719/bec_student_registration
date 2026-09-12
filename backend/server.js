const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://student-registration-eosin-theta.vercel.app",
      "http://localhost:5173"
    ]
  })
);
app.use(express.json());

// Connect to MongoDB Atlas with auto-retry
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Atlas connected");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error.message);
      console.log("Make sure IP is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0).");
      setTimeout(connectDB, 5000);
    });
};

connectDB();

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student Registration API is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
