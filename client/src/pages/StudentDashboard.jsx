import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useSocket } from '../contexts/SocketContext';
import Toast from '../components/Toast.jsx';

const StudentDashboard = () => {
  const { token } = useAuth();
  const socket = useSocket();
  const [profile, setProfile] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [profileRes, lessonsRes, progressRes] = await Promise.all([
          axios.get('/api/students/me', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/lessons/my', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/progress/my', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setProfile(profileRes.data);
        setLessons(lessonsRes.data);
        setProgress(progressRes.data);
      } catch (err) {
        setError('Failed to load student data');
      }
      setLoading(false);
    };
    fetchData();
  }, [token]);

  // Listen for real-time progress updates
  useEffect(() => {
    if (!socket) return;
    const handleProgressUpdated = (updatedProgress) => {
      // Only notify if the update is for this student
      if (profile && updatedProgress.student === profile._id) {
        setToastMsg('Your progress has been updated!');
        // Optionally, refresh progress data
        setProgress((prev) => {
          const idx = prev.findIndex(p => p._id === updatedProgress._id);
          if (idx !== -1) {
            const newArr = [...prev];
            newArr[idx] = updatedProgress;
            return newArr;
          }
          return prev;
        });
      }
    };
    socket.on('progressUpdated', handleProgressUpdated);
    return () => {
      socket.off('progressUpdated', handleProgressUpdated);
    };
  }, [socket, profile]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      <h2 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500 mb-2">{error}</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">My Profile</h3>
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <div><b>Name:</b> {profile?.user?.name}</div>
            <div><b>Email:</b> {profile?.user?.email}</div>
            <div><b>Class:</b> {profile?.class}</div>
            <div><b>Age:</b> {profile?.age}</div>
            <div><b>Additional Info:</b> {profile?.additionalInfo}</div>
          </div>
          <h3 className="text-lg font-semibold mb-2">My Lessons</h3>
          <ul className="mb-4">
            {lessons.map(lesson => (
              <li key={lesson._id} className="mb-2 p-2 bg-gray-100 rounded">
                <b>{lesson.title}</b>: {lesson.description}
              </li>
            ))}
            {lessons.length === 0 && <li>No lessons assigned.</li>}
          </ul>
          <h3 className="text-lg font-semibold mb-2">My Progress</h3>
          <ul>
            {progress.map(p => (
              <li key={p._id} className="mb-2 p-2 bg-gray-100 rounded">
                <b>Lesson:</b> {p.lesson?.title || p.lesson}<br />
                <b>Status:</b> {p.status}<br />
                <b>Feedback:</b> {p.feedback || 'None'}
              </li>
            ))}
            {progress.length === 0 && <li>No progress records.</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default StudentDashboard; 