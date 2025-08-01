import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CaseList from './pages/CaseList';
import CaseDetails from './pages/CaseDetails';
import './styles.css';
import ScrollToTop from './components/ScrollToTop';
import AddCase from './pages/AddCase';
import EditCase from './pages/EditCase';

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="page-content" id='scrollable-content'>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<CaseList />} />
            <Route path="/cases/:id" element={<CaseDetails />} />
            <Route path="/addcase" element={<AddCase />} />
            <Route path="/editcase/:id" element={<EditCase />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

