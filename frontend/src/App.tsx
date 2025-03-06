import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LuggageForm from './components/LuggageForm';
import LuggageSearch from './components/LuggageSearch';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to LostLuggage</h1>
                <p className="text-xl text-gray-600 mb-8">
                  Help us reunite travelers with their lost luggage
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Lost Luggage</h2>
                    <p className="text-gray-600 mb-6">
                      Lost your luggage? File a detailed report to help us locate it.
                    </p>
                    <Link
                      to="/report"
                      className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      File Report
                    </Link>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-8 transform transition duration-300 hover:scale-105">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Lost Luggage</h2>
                    <p className="text-gray-600 mb-6">
                      Looking for reported luggage? Search our database.
                    </p>
                    <Link
                      to="/search"
                      className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="/report" element={<LuggageForm />} />
            <Route path="/search" element={<LuggageSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
