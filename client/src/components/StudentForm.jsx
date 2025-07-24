import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, studentToEdit, clearEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    progress: ''
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', progress: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full border p-2"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border p-2"
      />
      <input
        name="progress"
        value={formData.progress}
        onChange={handleChange}
        placeholder="Progress (%)"
        required
        className="w-full border p-2"
      />
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {studentToEdit ? 'Update' : 'Add'} Student
        </button>
        {studentToEdit && (
          <button type="button" onClick={clearEdit} className="text-red-500">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
