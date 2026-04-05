import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import StudyPlanner from './pages/StudyPlanner';
import Career from './pages/Career';
import Assistant from './pages/Assistant';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/career" element={<Career />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;