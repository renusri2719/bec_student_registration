import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import Students from "./pages/Students";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route
          path="/register"
          element={
            <div className="container">
              <StudentForm />
            </div>
          }
        />
        <Route path="/students" element={<Students />} />
      </Routes>
    </div>
  );
}

export default App;
