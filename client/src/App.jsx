import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teacher" element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student" element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/parent" element={
          <ProtectedRoute role="parent">
            <ParentDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
