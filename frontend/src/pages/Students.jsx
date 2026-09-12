import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import StudentForm from "../components/StudentForm";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Students() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setMessage(location.state.successMessage);
    }
    getStudents();
  }, [location.key]);

  const getStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/students/${id}`);
      setMessage("Student deleted successfully!");
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  // Filter students by Name, Roll Number, or Department
  const filteredStudents = students.filter((student) => {
    const term = search.toLowerCase();
    return (
      (student.name && student.name.toLowerCase().includes(term)) ||
      (student.rollNumber && student.rollNumber.toLowerCase().includes(term)) ||
      (student.department && student.department.toLowerCase().includes(term))
    );
  });

  return (
    <div className="container">
      {/* Edit Form if a student is being edited */}
      {editingStudent && (
        <StudentForm
          initialStudent={editingStudent}
          onSave={() => {
            setEditingStudent(null);
            getStudents();
          }}
          onCancel={() => setEditingStudent(null)}
        />
      )}

      {/* Main Student Directory Card */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Registered Students</h2>
          <span style={{ color: "#718096", fontSize: "0.95rem" }}>
            Total: <strong>{students.length}</strong>
          </span>
        </div>

        {message && <div className="alert-success">{message}</div>}

        {/* Search input */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search students by name, roll number, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table Container with horizontal scrolling */}
        <div className="table-container">
          {filteredStudents.length === 0 ? (
            <p style={{ padding: "2rem", textAlign: "center", color: "#718096" }}>
              {students.length === 0
                ? "No students registered yet. Click 'Register Student' to add one."
                : "No matching students found."}
            </p>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td><strong>{student.name}</strong></td>
                    <td>{student.rollNumber}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.department}</td>
                    <td>{student.year}</td>
                    <td>{student.gender}</td>
                    <td>{student.dateOfBirth}</td>
                    <td>
                      <button
                        className="button button-edit"
                        onClick={() => {
                          setEditingStudent(student);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="button button-delete"
                        onClick={() => handleDelete(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Students;
