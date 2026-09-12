require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Set DNS servers so Atlas SRV connection string resolves reliably on Windows
try {
  require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Student Registration API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
