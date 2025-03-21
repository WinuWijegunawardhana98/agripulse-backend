import React from "react";

function Home() {
  return (
    <div className="bg-green-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to AgriPulse 🌾</h1>
        <p className="text-lg text-gray-600 mb-6">A smart rice order management system.</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default Home;
