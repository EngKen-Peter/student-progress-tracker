import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="z-10 text-center px-6 py-12 rounded-xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">Student Progress Tracker</h1>
        <p className="text-xl md:text-2xl mb-8 font-light animate-fade-in delay-100">Empower teachers, students, and parents with real-time progress tracking and notifications.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in delay-200">
          <Link to="/register" className="px-8 py-3 rounded-full bg-white text-blue-600 font-bold shadow-lg hover:bg-blue-100 transition">Get Started</Link>
          <Link to="/login" className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition">Login</Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-6 animate-fade-in delay-300">
        <span className="text-white/80 text-sm">&copy; {new Date().getFullYear()} Student Progress Tracker</span>
      </div>
    </div>
  );
};

export default LandingPage; 