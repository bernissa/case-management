// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
// import {
//   FiGrid, FiUsers, FiAlertTriangle, FiFileText,
//   FiBell, FiMessageCircle, FiSettings, FiUser, FiLogOut
// } from 'react-icons/fi';
import {
  FiGrid, FiFileText,
  FiSettings, FiUser, FiLogOut
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
        {/* <NavLink to="/drafts" className="nav-link">
          <FiFileText /> Drafts
        </NavLink> */}
        {/* <NavLink to="/notifications" className="nav-link">
          <FiBell /> Notifications
        </NavLink> */}
        {/* <NavLink to="/communicate" className="nav-link">
          <FiMessageCircle /> Communicate
        </NavLink> */}
        <NavLink to="/settings" className="nav-link">
          <FiSettings /> Settings
        </NavLink>
        <NavLink to="/your-account" className="nav-link">
          <FiUser /> Your Account
        </NavLink>
        <NavLink to="/logout" className="nav-link logout">
          <FiLogOut /> Log Out
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
