import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-xl shadow p-10 flex flex-col items-center">
        <h2 className="text-5xl font-bold text-blue-800 mb-4">404</h2>
        <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold shadow transition">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
