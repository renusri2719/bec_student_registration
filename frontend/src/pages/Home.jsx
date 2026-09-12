import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://student-registration-0zx5.onrender.com";

function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  const totalStudents = students.length;
  const totalDepartments = new Set(students.map((s) => s.department)).size;
  const firstYear = students.filter((s) => s.year === "1st Year").length;
  const secondYear = students.filter((s) => s.year === "2nd Year").length;
  const thirdYear = students.filter((s) => s.year === "3rd Year").length;
  const fourthYear = students.filter((s) => s.year === "4th Year").length;

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Student Registration System</h1>
        <p>Manage student registration easily and efficiently.</p>
        <div className="hero-buttons">
          <Link to="/register" className="button button-primary">
            Register Student
          </Link>
          <Link to="/students" className="button button-secondary">
            View Students
          </Link>
        </div>
      </div>

      {/* 6 Statistic Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Students</div>
          <div className="stat-value">{totalStudents}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Total Departments</div>
          <div className="stat-value">{totalDepartments}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">1st Year Students</div>
          <div className="stat-value">{firstYear}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">2nd Year Students</div>
          <div className="stat-value">{secondYear}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">3rd Year Students</div>
          <div className="stat-value">{thirdYear}</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">4th Year Students</div>
          <div className="stat-value">{fourthYear}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
