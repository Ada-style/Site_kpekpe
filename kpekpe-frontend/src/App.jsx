import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/StudentDashboard';
import ChatAI from './components/ChatAI';

// Placeholder pour les futures pages
const Courses = () => <div className="p-20 text-center">Catalogue de cours en cours...</div>;
const Universities = () => <div className="p-20 text-center text-kpekpe-green font-bold text-2xl">Annuaire des Universités <br /> (Bientôt disponible)</div>;
const Tutors = () => <div className="p-20 text-center text-kpekpe-green font-bold text-2xl">Marché des Répétiteurs <br /> (Bientôt disponible)</div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col font-outfit">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/dashboard" element={<StudentDashboard />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} Kpékpé Learnia. Tous droits réservés.</p>
            </div>
          </footer>
          <ChatAI />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
