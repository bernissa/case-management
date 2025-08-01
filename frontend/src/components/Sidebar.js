// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiFileText, FiPlus
} from 'react-icons/fi';
import '../styles.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="nav-links">
        <NavLink to="/" className="nav-link">
          <FiGrid /> Dashboard
        </NavLink>
        <NavLink to="/cases" className="nav-link">
          <FiFileText /> Case List
        </NavLink>
        <NavLink to="/addcase" className="nav-link">
          <FiPlus /> Add a Case
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
