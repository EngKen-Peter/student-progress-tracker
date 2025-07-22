import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../components/StudentCard";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (students.length === 0) {
    return <p className="text-center text-gray-600">No students found.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {students.map((student) => (
        <StudentCard key={student._id} student={student} />
      ))}
    </div>
  );
};

export default StudentList;
