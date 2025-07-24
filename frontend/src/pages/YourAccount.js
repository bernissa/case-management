import React, { useState } from 'react';
import '../styles.css';

const YourAccount = () => {
  const initialData = {
    name: 'Samuel Tonnie',
    phone: '+65 98135684',
    email: 'samtonnie@geolah.com',
    language: 'English Language (UK)',
    updated: '5/1/2025',
    avatar: '/profile-avatar.png',
  };

  const [userData, setUserData] = useState(initialData);
  const [editField, setEditField] = useState(null);
  const [tempData, setTempData] = useState(initialData);

  const handleEdit = (field) => {
    setEditField(field);
    setTempData(userData);
  };

  const handleCancel = () => {
    setEditField(null);
  };

  const handleSave = () => {
    setUserData(tempData);
    setEditField(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Your Account</h2>
      <div className="account-card">
        <div className="account-header">
          <img src={userData.avatar} alt="Profile" className="account-avatar" />
          <div>
            <p className="account-subtext">Last Updated: {userData.updated}</p>
          </div>
        </div>

        {/* Name Section */}
        <div className="account-section">
          <h4>Name</h4>
          <div className="account-info-row">
            {editField === 'name' ? (
              <>
                <input
                  name="name"
                  value={tempData.name}
                  onChange={handleChange}
                  className="account-input"
                />
                <div className="edit-controls">
                  <button className="save-btn" onClick={handleSave}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{userData.name}</span>
                <button className="edit-btn" onClick={() => handleEdit('name')}>Edit ✎</button>
              </>
            )}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="account-section">
          <h4>Contact Info</h4>
          <div className="account-info-row">
            {editField === 'contact' ? (
              <>
                <div className="contact-inputs">
                  <input
                    name="phone"
                    value={tempData.phone}
                    onChange={handleChange}
                    className="account-input"
                    placeholder="Phone"
                  />
                  <input
                    name="email"
                    value={tempData.email}
                    onChange={handleChange}
                    className="account-input"
                    placeholder="Email"
                  />
                </div>
                <div className="edit-controls">
                  <button className="save-btn" onClick={handleSave}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>Phone: {userData.phone}</div>
                  <div>Email: {userData.email}</div>
                </div>
                <button className="edit-btn" onClick={() => handleEdit('contact')}>Edit ✎</button>
              </>
            )}
          </div>
        </div>

        {/* Language Section */}
        <div className="account-section">
          <h4>Language</h4>
          <div className="account-info-row">
            {editField === 'language' ? (
              <>
                <input
                  name="language"
                  value={tempData.language}
                  onChange={handleChange}
                  className="account-input"
                />
                <div className="edit-controls">
                  <button className="save-btn" onClick={handleSave}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{userData.language}</span>
                <button className="edit-btn" onClick={() => handleEdit('language')}>Edit ✎</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourAccount;
