import React, { useState } from 'react';
import '../styles.css';

const communicationsData = [
  {
    id: 'c001',
    sender: 'System Bot',
    avatar: '/avatars/system.png',
    topic: 'Scheduled maintenance',
    message: 'We will be performing system maintenance on 18/4 from 1AM to 3AM.',
    date: '14/4',
  },
  {
    id: 'c002',
    sender: 'Admin - Clara',
    avatar: '/avatars/clara.png',
    topic: 'Review case #0025',
    message: 'Please check the draft you submitted for Sum Dum Fuk, there are missing fields.',
    date: '14/4',
  },
  {
    id: 'c003',
    sender: 'Compliance Team',
    avatar: '/avatars/compliance.png',
    topic: 'Audit prep',
    message: 'Reminder to finalize all verdicts before the monthly audit on 20/4.',
    date: '13/4',
  },
  {
    id: 'c004',
    sender: 'Admin - T. Kelvin',
    avatar: '/avatars/kelvin.png',
    topic: 'Urgent: High-risk driver case',
    message: 'Kindly prioritize the accident case involving Panch Man. Further investigation needed.',
    date: '12/4',
  },
  {
    id: 'c005',
    sender: 'System Bot',
    avatar: '/avatars/system.png',
    topic: 'New feature deployed',
    message: 'You can now export multiple case files as PDF in one click.',
    date: '12/4',
  },
];

const Communicate = () => {
  const [search, setSearch] = useState('');

  const filteredComms = communicationsData.filter(comm =>
    comm.sender.toLowerCase().includes(search.toLowerCase()) ||
    comm.topic.toLowerCase().includes(search.toLowerCase()) ||
    comm.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <h2 className="page-title">Communications</h2>

      <div className="communication-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-main new-message-btn">+ New Message</button>
      </div>

      <div className="drafts-list">
        {filteredComms.length > 0 ? filteredComms.map((comm) => (
          <div key={comm.id} className="draft-card comm-card">
            <img src={comm.avatar} alt="avatar" className="comm-avatar" />
            <div className="draft-main">
              <div>
                <strong>{comm.topic}</strong>
                <div style={{ fontSize: '0.85rem', color: '#888' }}>From: {comm.sender}</div>
                <div style={{ marginTop: '6px', fontSize: '0.9rem' }}>
                  {comm.message.length > 100 ? comm.message.slice(0, 100) + '...' : comm.message}
                </div>
              </div>
              <div className="draft-dates">
                <div>{comm.date}</div>
              </div>
            </div>
          </div>
        )) : <div className="no-results">No messages match your search.</div>}
      </div>

      <button className="btn-main delete-drafts-button">CLEAR ALL MESSAGES</button>
    </div>
  );
};

export default Communicate;
