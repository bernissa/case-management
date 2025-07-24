import React from 'react';
import '../styles.css'; // Your global styles

const notificationsData = [
  {
    id: 'n001',
    title: 'New case submitted for review',
    category: 'Case',
    date: '14/4',
    message: 'A new violation case has been submitted by supervisor Clara.',
  },
  {
    id: 'n002',
    title: 'Draft auto-saved',
    category: 'System',
    date: '14/4',
    message: 'Your draft for case #0033 - Panch Man has been automatically saved.',
  },
  {
    id: 'n003',
    title: 'Compliance report due',
    category: 'Reminder',
    date: '13/4',
    message: 'Monthly compliance report is due by 20/4. Please ensure all pending cases are closed.',
  },
  {
    id: 'n004',
    title: 'Case 0027 requires attention',
    category: 'Case',
    date: '13/4',
    message: 'The case against Cray Zi Foo has received a new statement. Review required.',
  },
  {
    id: 'n005',
    title: 'System update',
    category: 'System',
    date: '12/4',
    message: 'A new feature for bulk case export has been deployed.',
  },
];

const Notifications = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Notifications</h2>
      <div className="drafts-list">
        {notificationsData.map((notif) => (
          <div key={notif.id} className="draft-card">
            <div className="draft-main">
              <div>
                <strong>{notif.title}</strong>
                <div style={{ fontSize: '0.9rem', margin: '4px 0', color: '#666' }}>{notif.message}</div>
                <div className="badge">{notif.category}</div>
              </div>
              <div className="draft-dates">
                <div>{notif.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-main delete-drafts-button">CLEAR ALL NOTIFICATIONS</button>
    </div>
  );
};

export default Notifications;
