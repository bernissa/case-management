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
import ViolatorRecord from './pages/ViolatorRecord';
import { mockCaseList } from './pages/mockCaseData'; // update this path accordingly
import EditCase from './pages/EditCase';
import Drafts from './pages/Drafts';
import Notifications from './pages/Notifications';
import Communicate from './pages/Communications';
import Settings from './pages/Settings';
import YourAccount from './pages/YourAccount';

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
            <Route path="/record/:id" element={<ViolatorRecord data={mockCaseList}/>} />
            <Route path="/addcase" element={<AddCase />} />
            <Route path="/editcase/:id" element={<EditCase />} />
            <Route path="drafts" element={<Drafts />}/>
            <Route path="notifications" element={<Notifications />}/>
            <Route path="communicate" element={<Communicate />}/>
            <Route path="settings" element={<Settings />}/>
            <Route path="your-account" element={<YourAccount />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

