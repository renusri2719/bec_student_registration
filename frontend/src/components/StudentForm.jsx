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

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setMessage("");
    setError("");

    if (!name || !rollNumber || !email || !phone || !department || !year || !gender || !dateOfBirth) {
      setError("Please fill in all fields");
      return;
    }

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

    setLoading(true);

    try {
      if (initialStudent) {
        const res = await axios.put(`${API_URL}/api/students/${initialStudent._id}`, studentData);
        setMessage(res.data.message || "Student updated successfully!");
        if (onSave) onSave();
      } else {
        const res = await axios.post(`${API_URL}/api/students`, studentData);
        setMessage("Student registered successfully!");

        // Clear and reset form fields
        setName("");
        setRollNumber("");
        setEmail("");
        setPhone("");
        setDepartment("");
        setYear("");
        setGender("");
        setDateOfBirth("");

        if (onSave) {
          onSave();
        } else {
          // Automatically navigate to Registered Students page
          setTimeout(() => {
            navigate("/students", {
              state: { successMessage: "Student registered successfully!" }
            });
          }, 900);
        }
      }
    } catch (err) {
      console.log("Error submitting form:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error connecting to server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          {initialStudent ? "Edit Student" : "Register Student"}
        </h2>
      </div>

      {message && <div className="alert-success">{message}</div>}
      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Student"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              className="input"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. CSE001"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@college.in"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              className="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={loading}
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <select
              className="select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={loading}
            >
              <option value="">-- Select Year --</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              className="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={loading}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="text"
              className="input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              placeholder="e.g. 15/08/2005"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? "Processing..." : initialStudent ? "Update Student" : "Register Student"}
          </button>
          {onCancel && (
            <button
              type="button"
              className="button button-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
