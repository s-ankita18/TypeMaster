import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SimpleMode from './components/SimpleMode';
import AdvancedMode from './components/AdvancedMode';
import GameMode from './components/GameMode';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import './styles.css';

// function App() {
  
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   return (
//     <Router>
//       {user ? (
//         <>
//           <Navbar user={user} onLogout={handleLogout} />
//           <Routes>
//             <Route path="/home" element={<Home />} />
//             <Route path="/simple" element={<SimpleMode />} />
//             <Route path="/advanced" element={<AdvancedMode />} />
//             <Route path="/game" element={<GameMode />} />
//             <Route path="*" element={<Navigate to="/home" />} />
//           </Routes>
//           <Footer />
//         </>
//       ) : (
//         <Routes>
//           <Route path="/" element={<Login setUser={setUser} />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       )}
//     </Router>
//   );
// }

// export default App;

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/simple" element={<SimpleMode />} />
            <Route path="/advanced" element={<AdvancedMode />} />
            <Route path="/game" element={<GameMode />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;