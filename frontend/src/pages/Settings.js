import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Settings = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate('/your-account');
  };

  const sections = [
    {
      title: 'User Management',
      items: [
        'User Roles & Permissions',
        'Add/Edit/Delete Users',
        'Password Policies',
        'Account Lockout Settings',
        'Two-Factor Authentication (2FA) Settings',
      ],
    },
    {
      title: 'Notifications',
      items: [
        'Data Backup Settings',
        'Storage Limits',
        'Import/Export Data',
        'Data Retention Policies',
      ],
    },
    {
      title: 'Security Settings',
      items: [
        'Access Control',
        'Session Timeout',
        'IP Whitelisting / Blacklisting',
        'Audit Logs',
        'Encryption Settings',
      ],
    },
    {
      title: 'Support & Help',
      items: [
        'Help Documentation',
        'Contact Support',
        'Report a Bug',
        'System Status Page',
      ],
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Settings</h2>
      <div className="settings-card">
        <div className="settings-header">
          <img src="/profile-avatar.png" alt="Admin Avatar" className="settings-avatar" />
          <div>
            <div className="settings-name" onClick={handleAccountClick}>
              <strong className="settings-link">Samuel Tonnie</strong>
            </div>
            <div className="settings-subtext">Admin since 1/1/2025</div>
          </div>
        </div>

        {sections.map((section, idx) => (
          <div className="settings-section" key={idx}>
            <h4>{section.title}</h4>
            <ul className="settings-list">
              {section.items.map((item, i) => (
                <li className="settings-list-item" key={i}>
                  <span>{item}</span>
                  <span className="arrow">{'>'}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
