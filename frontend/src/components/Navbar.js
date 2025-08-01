// Navbar.js
import React from 'react';
import '../styles.css';
import logo from '../assets/logo.png';
import avatar from '../assets/generic-profile.svg';
// import search from '../assets/mingcute_search-line.svg';

export default function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-icons">
          <p>Case Management System</p>
          <div className="navbar-avatar">
            <img src={avatar} alt="Avatar" />
          </div>
        </div>
      </nav>
    );
  }
