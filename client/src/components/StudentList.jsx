import React from 'react';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (!students.length) {
    return <p className="text-center mt-4 text-gray-600">No students found.</p>;
  }

  return (
    <ul className="space-y-2 mt-4">
      {students.map((student) => (
        <li key={student._id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
          <div>
            <h4 className="font-bold">{student.name}</h4>
            <p>Email: {student.email}</p>
            <p>Progress: {student.progress}%</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => onEdit(student)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
            <button onClick={() => onDelete(student._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
