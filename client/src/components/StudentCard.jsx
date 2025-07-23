import React from 'react';

const StudentCard = ({ student, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
      <p className="text-gray-600">Email: {student.email}</p>
      <div className="w-full bg-gray-200 rounded-full h-4 mt-2 mb-1">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${student.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-700 mb-2">Progress: {student.progress}%</p>

      <div className="flex justify-between mt-3">
        <button
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(student._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
