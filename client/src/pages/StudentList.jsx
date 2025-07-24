import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "../components/StudentCard";
import { useAuth } from '../contexts/AuthContext';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user?.role === 'teacher') {
      axios.get("/api/students", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setStudents(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, token]);

  if (user?.role !== 'teacher') {
    return <p className="text-center text-gray-600">You do not have access to view all students.</p>;
  }

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
