import React from 'react';
import '../styles.css'; // Customize your styling here

const draftCases = [
  {
    id: '0023',
    name: 'Alex Low',
    category: 'Ride-hailing',
    violation: '',
    verdict: '',
    created: '08/4',
    lastEdit: '14/4',
  },
  {
    id: '0024',
    name: 'Stew Pit',
    category: 'Ride-hailing',
    violation: '',
    verdict: '',
    created: '08/4',
    lastEdit: '14/4',
  },
  {
    id: '0025',
    name: 'Sum Dum Fuk',
    category: 'Delivery',
    violation: '',
    verdict: '',
    created: '11/4',
    lastEdit: '14/4',
  },
  {
    id: '0027',
    name: 'Cray Zi Foo',
    category: 'Delivery',
    violation: '',
    verdict: '',
    created: '11/4',
    lastEdit: '14/4',
  },
  {
    id: '0033',
    name: 'Panch Man',
    category: 'Accident',
    violation: '',
    verdict: '',
    created: '12/4',
    lastEdit: '14/4',
  },
  {
    id: '0036',
    name: 'Austin Tan',
    category: 'Accident',
    violation: '',
    verdict: '',
    created: '12/4',
    lastEdit: '14/4',
  },
];

const Drafts = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Drafts</h2>
      <div className="drafts-list">
        {draftCases.map((draft) => (
          <div key={draft.id} className="draft-card">
            <div className="draft-main">
              <div>
                <strong style={{ fontSize: '20px' }}>{draft.id} - {draft.name}</strong>
                <div>{draft.category}</div>
                <div>Violation: {draft.violation || '-'}</div>
                <div>Verdict: {draft.verdict || '-'}</div>
              </div>
              <div className="draft-right-section">
                <div className="draft-dates">
                  <div>Created: {draft.created}</div>
                  <div>Last Edit: {draft.lastEdit}</div>
                </div>
                <button className="btn-main delete-drafts-button draft-card-button">DELETE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-main delete-drafts-button">DELETE ALL DRAFTS</button>
    </div>
  );
};

export default Drafts;
