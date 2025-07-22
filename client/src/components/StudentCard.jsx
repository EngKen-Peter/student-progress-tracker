import React from "react";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
      <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
      <p className="text-sm text-gray-600">{student.email}</p>
      <div className="mt-3 w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${student.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-700 mt-1">Progress: {student.progress}%</p>
    </div>
  );
};

export default StudentCard;
