import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const departments = [
  "CSE",
  "CSE - AI & ML",
  "CSE - AI & Data Science",
  "CSE - Data Science",
  "CSE - Cyber Security",
  "CSE - IoT",
  "Information Technology (IT)",
  "ECE",
  "EEE",
  "MECH",
  "Civil Engineering",
  "AI & DS",
  "AI & ML",
  "DS"
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function StudentForm({ initialStudent, onSave, onCancel }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (initialStudent) {
      setName(initialStudent.name || "");
      setRollNumber(initialStudent.rollNumber || "");
      setEmail(initialStudent.email || "");
      setPhone(initialStudent.phone || "");
      setDepartment(initialStudent.department || "");
      setYear(initialStudent.year || "");
      setGender(initialStudent.gender || "");
      setDateOfBirth(initialStudent.dateOfBirth || "");
    }
  }, [initialStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      name,
      rollNumber,
      email,
      phone,
      department,
      year,
      gender,
      dateOfBirth
    };

    try {
      if (initialStudent) {
        await axios.put(`${API_URL}/api/students/${initialStudent._id}`, studentData);
        alert("Student updated successfully!");
        if (onSave) onSave();
      } else {
        await axios.post(`${API_URL}/api/students`, studentData);
        alert("Student registered successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Error saving student");
    }
  };

  return (
    <div className="form-container">
      <h2>{initialStudent ? "Edit Student" : "Register Student"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Student"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            placeholder="CSE001"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="student@college.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {initialStudent ? "Update Student" : "Register Student"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default StudentForm;
