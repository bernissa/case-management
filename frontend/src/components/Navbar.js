// Navbar.js
import React from 'react';
import '../styles.css';
import logo from '../assets/logo.png';
import avatar from '../assets/Ellipse 7.svg';
import notif from '../assets/iconamoon_notification-thin.svg';
// import search from '../assets/mingcute_search-line.svg';
import arrowdown from '../assets/raphael_arrowdown.svg';

export default function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-icons">
          <img src={notif} alt="Notif" />
          <p>Case Management System</p>
          <div className="navbar-avatar">
            <img src={avatar} alt="Avatar" />
            <img src={arrowdown} alt="Arrowdown" />
          </div>
        </div>
      </nav>
    );
  }
