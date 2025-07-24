import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';


const ViolatorRecord = ({ data }) => {
  const { id } = useParams(); // get driver ID from URL

  // Filter all cases for this specific driver
  const violatorData = data.filter(record => record.driverId === id);

  if (violatorData.length === 0) return <div>No records found for this driver.</div>;

  const { name } = violatorData[0];
  const totalCases = violatorData.length;
  const warnings = violatorData.filter(record => record.action.toLowerCase().includes('warn')).length;
  const suspensions = violatorData.filter(record => record.action.toLowerCase().includes('susp')).length;
  const bans = violatorData.filter(record => record.action.toLowerCase().includes('ban')).length;

  return (
    <div className="violator-page">
      <div className="violator-summary">
        <div className="violator-info">
          <div className="violator-name">{name}</div>
          <div className="driver-id">Driver ID: {id}</div>
          <div className="total-cases">Total Cases: {totalCases}</div>
          <div className="total-cases">Current Status: </div>
        </div>
        <img src={data.driverImage} alt="Avatar" className="violator-avatar" />
      </div>


      <div className="violator-stats">
        <div className="stat-card">
          <strong className='stat-number'>{warnings}</strong>
          <strong className='stat-label'>Warnings</strong>
        </div>
        <div className="stat-card">
          <strong className='stat-number'>{suspensions}</strong>
          <strong className='stat-label'>Suspensions</strong>
        </div>
        <div className="stat-card">
          <strong className='stat-number'>{bans}</strong>
          <strong className='stat-label'>Bans</strong>
        </div>
        <div className="stat-card">
          <strong className='stat-number'>{totalCases}</strong>
          <strong className='stat-label'>Total Cases</strong>
        </div>
      </div>

      <div className="case-tabs">
        <button className="btn-main active-type type-filter">ALL CASES</button>
        <button className="btn-main type-filter">RIDE HAILING</button>
        <button className="btn-main type-filter">DELIVERY</button>
        <button className="btn-main type-filter">ACCIDENTS</button>
      </div>

      <div className="violator-table-wrapper">
        <table className="violator-table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Trip ID</th>
              <th>Violation</th>
              <th>Effect Date</th>
              <th>Follow-Up Action</th>
              <th>Status</th>
              <th>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='add-icon'>
                  <path d="M11 0C11.5148 0 12.0086 0.204516 12.3726 0.568558C12.7367 0.932599 12.9412 1.42634 12.9412 1.94118V9.05882H20.0588C20.5737 9.05882 21.0674 9.26334 21.4314 9.62738C21.7955 9.99142 22 10.4852 22 11C22 11.5148 21.7955 12.0086 21.4314 12.3726C21.0674 12.7367 20.5737 12.9412 20.0588 12.9412H12.9412V20.0588C12.9412 20.5737 12.7367 21.0674 12.3726 21.4314C12.0086 21.7955 11.5148 22 11 22C10.4852 22 9.99142 21.7955 9.62738 21.4314C9.26334 21.0674 9.05882 20.5737 9.05882 20.0588V12.9412H1.94118C1.42634 12.9412 0.932599 12.7367 0.568558 12.3726C0.204516 12.0086 0 11.5148 0 11C0 10.4852 0.204516 9.99142 0.568558 9.62738C0.932599 9.26334 1.42634 9.05882 1.94118 9.05882H9.05882V1.94118C9.05882 1.42634 9.26334 0.932599 9.62738 0.568558C9.99142 0.204516 10.4852 0 11 0Z" fill="#00BB06" />
                </svg>
              </th>
            </tr>
          </thead>
          <tbody>
            {violatorData.map(record => (
              <tr key={record.id}>
                <td className='bold-text'>{record.id}</td>
                <td>{record.tripId}</td>
                <td className='red-text bold-text'>{record.violation}</td>
                <td>{record.effectDate}</td>
                <td className='red-text bold-text'>{record.action}</td>
                <td>{record.status}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='edit-icon'>
                    <path d="M3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5L16.2 6.4L17.6 7.8Z" fill="url(#paint0_linear_215_5404)" />
                    <defs>
                      <linearGradient id="paint0_linear_215_5404" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#800080" />
                        <stop offset="1" stop-color="#9D00FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViolatorRecord;



