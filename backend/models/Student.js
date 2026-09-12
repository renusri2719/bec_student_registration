const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  email: String,
  phone: String,
  department: String,
  year: String,
  gender: String,
  dateOfBirth: String
});

module.exports = mongoose.model("Student", studentSchema);
