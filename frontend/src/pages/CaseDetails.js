import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CaseDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cases/${id}`);
        setData(res.data);
      } catch (err) {
        setError('❌ Case not found or server error.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading case details...</div>;
  if (error) return <div className="p-10 text-center text-red-600 font-medium">{error}</div>;
  if (!data) return null;

  return (
    <div className="case-detail-grid-layout">
      {/* Header */}
      <div className="case-detail-item xlarge">
        <div className="case-detail-driver-name">
          <img
            src={data.driverImage}
            alt="Driver"
            className="case-detail-avatar"
          />
          <div>
            <h2 className="name-link highlight-text">
              <a
                href={`/record/${data.driverId}`}
                className="name-link highlight-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.name}
              </a>
            </h2>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Source of the case:</strong> {data.source}</p>
            <p className="text-sm text-gray-500"><strong>Case Date:</strong> {data.effectDate}</p>
          </div>
        </div>
        <Link to={`/editcase/${id}`}>
          <button className="btn-main">EDIT CASE</button>
        </Link>
      </div>

      {/* Violator Details */}
      <div className="case-detail-item">
        <h3><strong>Violator Details</strong></h3>
        <p><strong>Driver ID:</strong> {data.driverId}</p>
        <p><strong>Contact:</strong> {data.contact}</p>
        <p><strong>Email:</strong> {data.email}</p>
      </div>

      {/* Case Details */}
      <div className="case-detail-item">
        <h3><strong>Case Details</strong></h3>
        <p><strong>Case ID:</strong> {data.id}</p>
        <p><strong>Trip ID:</strong> {data.tripId}</p>
        <p className="red-text"><strong>Violation:</strong> {data.violation}</p>
      </div>

      {/* Case Status */}
      <div className="case-detail-item">
        <h3><strong>Case Status</strong></h3>
        <p><strong>Status:</strong> <span className="text-green-600 uppercase">{data.status}</span></p>
        <p><strong>Follow-Up Action:</strong> <span className="red-text bold-text">{data.action}</span></p>
        <p><strong>Duration:</strong> {data.duration}</p>
      </div>

      {/* Remarks */}
      <div className="case-detail-full">
        <h3 className="text-lg font-semibold mb-2">Brief Remarks</h3>
        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">{data.remarks}</p>
      </div>

      {/* Customer Service */}
      <div className="case-detail-full">
        <h3 className="customer-service-title">Customer Service</h3>
        <div className="customer-service-table-wrapper">
          <table className="customer-service-table">
            <tbody>
              <tr><td>User Type:</td><td>{data.customerService?.userType}</td></tr>
              <tr><td>Fleet Type:</td><td>{data.customerService?.fleetType}</td></tr>
              <tr><td>Transaction ID:</td><td>{data.customerService?.transactionId}</td></tr>
              <tr><td>Service Type:</td><td>{data.customerService?.serviceType}</td></tr>
              <tr><td>Type of Issue:</td><td>{data.customerService?.typeOfIssue}</td></tr>
              <tr><td>Trip ID:</td><td>{data.tripId}</td></tr>
            </tbody>
          </table>
          <table className="customer-service-table">
            <tbody>
              <tr><td>Incident Date:</td><td>{data.customerService?.incidentDate}</td></tr>
              <tr><td>Incident Start Time:</td><td>{data.customerService?.startTime}</td></tr>
              <tr><td>Incident End Time:</td><td>{data.customerService?.endTime}</td></tr>
              <tr><td>Ticket Created On:</td><td>{data.customerService?.ticketDate}</td></tr>
              <tr><td>Ticket Resolved By:</td><td>{data.customerService?.resolvedBy}</td></tr>
              <tr><td>Ticket Resolved Date:</td><td>{data.customerService?.resolvedDate}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance */}
      <div className="case-detail-full">
        <h3 className="customer-service-title">Compliance</h3>
        <div className="customer-service-table-wrapper">
          <table className="customer-service-table">
            <tbody>
              <tr><td>Input By:</td><td>{data.compliance?.inputBy}</td></tr>
              <tr><td>Verdict By:</td><td>{data.compliance?.verdictBy}</td></tr>
              <tr><td>Suspension Start:</td><td>{data.compliance?.suspensionStartDate}</td></tr>
            </tbody>
          </table>
          <table className="customer-service-table">
            <tbody>
              <tr><td>Reinstated By:</td><td>{data.compliance?.reinstatedBy}</td></tr>
              <tr><td>Staff handling case:</td><td>{data.compliance?.handler}</td></tr>
              <tr><td>Suspension End:</td><td>{data.compliance?.suspensionEndDate}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
