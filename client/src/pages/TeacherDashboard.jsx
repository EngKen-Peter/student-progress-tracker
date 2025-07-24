import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/studentService';

const initialForm = { name: '', email: '', class: '', age: '', additionalInfo: '', parentEmail: '' };

const TeacherDashboard = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getStudents(token);
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingId) {
        await updateStudent(editingId, form, token);
      } else {
        await createStudent(form, token);
      }
      setForm(initialForm);
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      setError('Failed to save student');
    }
    setLoading(false);
  };

  const handleEdit = (student) => {
    setForm({
      name: student.user?.name || '',
      email: student.user?.email || '',
      class: student.class || '',
      age: student.age || '',
      additionalInfo: student.additionalInfo || '',
      parentEmail: student.parent?.email || '',
    });
    setEditingId(student._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteStudent(id, token);
      fetchStudents();
    } catch (err) {
      setError('Failed to delete student');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Teacher Dashboard</h2>
      <h3 className="text-lg font-semibold mb-2">Student Management</h3>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" required />
        <input name="class" value={form.class} onChange={handleChange} placeholder="Class" className="border p-2 rounded" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" className="border p-2 rounded" />
        <input name="parentEmail" value={form.parentEmail} onChange={handleChange} placeholder="Parent Email (optional)" className="border p-2 rounded md:col-span-2" />
        <input name="additionalInfo" value={form.additionalInfo} onChange={handleChange} placeholder="Additional Info" className="border p-2 rounded md:col-span-2" />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={loading}>
            {editingId ? 'Update' : 'Add'} Student
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
          )}
        </div>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="p-2 border">{student.user?.name}</td>
                <td className="p-2 border">{student.user?.email}</td>
                <td className="p-2 border">{student.class}</td>
                <td className="p-2 border">{student.age}</td>
                <td className="p-2 border flex gap-2">
                  <button onClick={() => handleEdit(student)} className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherDashboard; 