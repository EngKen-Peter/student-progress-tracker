import React from "react";
import StudentList from "./pages/StudentList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Student Progress Tracker</h1>
      <StudentList />
    </div>
  );
};

export default App;
