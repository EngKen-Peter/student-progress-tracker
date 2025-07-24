import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ParentDashboard = () => {
  const { token } = useAuth();
  const [children, setChildren] = useState([]);
  const [lessons, setLessons] = useState({});
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const childrenRes = await axios.get('/api/students/my-children', { headers: { Authorization: `Bearer ${token}` } });
        setChildren(childrenRes.data);
        // For each child, fetch lessons and progress
        const lessonsObj = {};
        const progressObj = {};
        await Promise.all(childrenRes.data.map(async (child) => {
          const [lessonsRes, progressRes] = await Promise.all([
            axios.get(`/api/lessons/child/${child.user}`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`/api/progress/child/${child.user}`, { headers: { Authorization: `Bearer ${token}` } }),
          ]);
          lessonsObj[child._id] = lessonsRes.data;
          progressObj[child._id] = progressRes.data;
        }));
        setLessons(lessonsObj);
        setProgress(progressObj);
      } catch (err) {
        setError('Failed to load children data');
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Parent Dashboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500 mb-2">{error}</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">My Children</h3>
          {children.length === 0 && <div>No children found.</div>}
          {children.map(child => (
            <div key={child._id} className="mb-6 p-4 bg-gray-50 rounded">
              <div className="font-semibold">{child.user?.name} ({child.user?.email})</div>
              <div><b>Class:</b> {child.class}</div>
              <div><b>Age:</b> {child.age}</div>
              <div><b>Additional Info:</b> {child.additionalInfo}</div>
              <div className="mt-2">
                <b>Lessons:</b>
                <ul>
                  {(lessons[child._id] || []).map(lesson => (
                    <li key={lesson._id} className="mb-1 p-1 bg-gray-100 rounded">
                      <b>{lesson.title}</b>: {lesson.description}
                    </li>
                  ))}
                  {(lessons[child._id] || []).length === 0 && <li>No lessons assigned.</li>}
                </ul>
              </div>
              <div className="mt-2">
                <b>Progress:</b>
                <ul>
                  {(progress[child._id] || []).map(p => (
                    <li key={p._id} className="mb-1 p-1 bg-gray-100 rounded">
                      <b>Lesson:</b> {p.lesson?.title || p.lesson}<br />
                      <b>Status:</b> {p.status}<br />
                      <b>Feedback:</b> {p.feedback || 'None'}
                    </li>
                  ))}
                  {(progress[child._id] || []).length === 0 && <li>No progress records.</li>}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ParentDashboard; 