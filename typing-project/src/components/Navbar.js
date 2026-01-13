import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const isMode = ['/simple', '/advanced', '/game'].includes(location.pathname);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">TypeMaster</Link>
        <div className="navbar-nav me-auto">
          <Link className={`nav-link ${isHome ? 'active' : ''}`} to="/home">Home</Link>
          <div className="nav-item dropdown">
            <a className={`nav-link dropdown-toggle ${isMode ? 'active' : ''}`} href="#" id="modesDropdown" role="button" data-bs-toggle="dropdown">
              Modes
            </a>
            <ul className="dropdown-menu">
              <li><Link className={`dropdown-item ${location.pathname === '/simple' ? 'bg-warning' : ''}`} to="/simple">Simple Mode</Link></li>
              <li><Link className={`dropdown-item ${location.pathname === '/advanced' ? 'bg-warning' : ''}`} to="/advanced">Advanced Mode</Link></li>
              <li><Link className={`dropdown-item ${location.pathname === '/game' ? 'bg-warning' : ''}`} to="/game">Game Mode</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-nav">
          <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
              Hello, {user.username} <i className="fas fa-user"></i>
            </a>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;