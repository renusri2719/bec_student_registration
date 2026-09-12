const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = require("../models/Student");

// Get all students
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([]);
    }
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error getting students" });
  }
});

// Get single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error getting student" });
  }
});

// Register new student
router.post("/", async (req, res) => {
  try {
    const { name, rollNumber, email, phone, department, year, gender, dateOfBirth } = req.body;

    if (!name || !rollNumber || !email || !phone || !department || !year || !gender || !dateOfBirth) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "MongoDB Atlas is not connected yet. Please whitelist your IP (43.252.205.45 or 0.0.0.0/0) in MongoDB Atlas Network Access."
      });
    }

    const existingStudent = await Student.findOne({
      rollNumber: req.body.rollNumber
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Roll number already exists"
      });
    }

    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: student
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || "Error registering student"
    });
  }
});

// Update student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      message: "Student updated successfully",
      student: updatedStudent
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error updating student" });
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error deleting student" });
  }
});

module.exports = router;
