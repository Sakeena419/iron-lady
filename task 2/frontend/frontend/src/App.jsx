import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, TrendingUp, Award, FileText } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { Participants, Programs, Enrollments, Milestones, TransformationStories } from './components/AllComponents';
import './App.css';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/participants', icon: Users, label: 'Participants' },
    { path: '/programs', icon: BookOpen, label: 'Programs' },
    { path: '/enrollments', icon: TrendingUp, label: 'Enrollments' },
    { path: '/milestones', icon: Award, label: 'Milestones' },
    { path: '/stories', icon: FileText, label: 'Success Stories' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Iron Lady</h1>
        <p>Participant Tracking System</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/stories" element={<TransformationStories />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
