import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import KRS from './pages/KRS';
import Nilai from './pages/Nilai';
import Jadwal from './pages/Jadwal';
import Informasi from './pages/Informasi';
import Navbar from './components/Navbar';
import ButtonToTop from './components/ButtonToTop';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Navbar user={user} onLogout={handleLogout} />
            <main>
              <Routes>
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/krs" element={<KRS user={user} />} />
                <Route path="/nilai" element={<Nilai user={user} />} />
                <Route path="/jadwal" element={<Jadwal user={user} />} />
                <Route path="/informasi" element={<Informasi />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
            <ButtonToTop />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;