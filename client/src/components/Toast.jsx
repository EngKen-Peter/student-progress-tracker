import React from 'react';

const Toast = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
      {message}
      <button className="ml-4 text-white font-bold" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast; 