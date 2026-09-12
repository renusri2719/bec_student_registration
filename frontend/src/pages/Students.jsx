import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "../components/StudentForm";

const API_URL = import.meta.env.VITE_API_URL || "https://bec-student-registration.onrender.com";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${API_URL}/api/students/${id}`);
        alert("Student deleted successfully!");
        fetchStudents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredStudents = students.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.name?.toLowerCase().includes(term) ||
      s.rollNumber?.toLowerCase().includes(term) ||
      s.department?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container">
      {editingStudent && (
        <div style={{ marginBottom: "30px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
          <StudentForm
            initialStudent={editingStudent}
            onSave={() => {
              setEditingStudent(null);
              fetchStudents();
            }}
            onCancel={() => setEditingStudent(null)}
          />
        </div>
      )}

      <h2>Registered Students</h2>

      <div>
        <input
          type="text"
          placeholder="Search by name, roll number, department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>

      <table>
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
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          ) : (
            filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.department}</td>
                <td>{student.year}</td>
                <td>{student.gender}</td>
                <td>{student.dateOfBirth}</td>
                <td>
                  <button onClick={() => setEditingStudent(student)}>Edit</button>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
