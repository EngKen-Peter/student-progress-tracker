import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateStudentForm({ student, onUpdate }) {
  const [formData, setFormData] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/students/${student._id}`, formData);
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input name="name" value={formData.name} onChange={handleChange} className="input" />
      <input name="email" value={formData.email} onChange={handleChange} className="input" />
      <input name="progress" value={formData.progress} onChange={handleChange} className="input" />
      <button type="submit" className="btn btn-blue">Update</button>
    </form>
  );
}
