import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function CaseDetailPage() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCaseData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cases/${id}`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load case data');
                setLoading(false);
            }
        };

        fetchCaseData();
    }, [id]);

    if (loading) {
        return (
            <div className="p-10 text-center text-blue-600 font-medium">
                Loading case data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-600 font-medium">
                ❌ {error}
            </div>
        );
    }

    if (!data) {
        return (
            <div className="p-10 text-center text-red-600 font-medium">
                ❌ Case with ID "{id}" not found.
            </div>
        );
    }

    return (
        <div className="case-detail-grid-layout">

            {/* Header */}
            <div className="case-detail-item xlarge">
                <div className="case-detail-driver-name">
                    <img
                        src={data.profile}
                        alt="Driver"
                        className="case-detail-avatar"
                    />
                    <div>
                        <h2 className="name-link highlight-text">
                            <a
                                href={`/record/${data.userId}`}
                                className="name-link highlight-text"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {data.name}
                            </a>
                        </h2>

                        <p><strong>Type: </strong>{data.type}</p>
                        <p><strong>Source of the case: </strong>{data.source}</p>
                        <p className="text-sm text-gray-500"><strong>Case Date: </strong>{data.effectDate}</p>
                    </div>
                </div>
                <Link to={`/editcase/${id}`}>
                    <button className="btn-main">EDIT CASE</button>
                </Link>
            </div>

            {/* 3 Columns */}
            <div className="case-detail-item">
                <h3><strong>Violator Details</strong></h3>
                <p><strong>User ID:</strong> {data.userId}</p>
                <p><strong>Contact:</strong> {data.contact}</p>
                <p><strong>Email:</strong> {data.email}</p>
            </div>

            <div className="case-detail-item">
                <h3><strong>Case Details</strong></h3>
                <p><strong>Case ID:</strong> {data._id}</p>
                <p><strong>Trip ID:</strong> {data.tripId}</p>
                <p className='red-text'><strong>Violation:</strong> {data.violation}</p>
            </div>

            <div className="case-detail-item">
                <h3><strong>Case Status</strong></h3>
                <p><strong>Status:</strong> <span className="text-green-600 uppercase">{data.status}</span></p>
                <p><strong>Follow-Up-Action:</strong> <span className="red-text bold-text">{data.action}</span></p>
                <p><strong>Duration:</strong> Permanent</p>
            </div>

            {/* Remarks */}
            <div className="case-detail-full">
                <h3 className="text-lg font-semibold mb-2">Brief Remarks</h3>
                <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                    {data.remarks}
                </p>
            </div>
            
            {/* Customer Service */}
            <div className="case-detail-full">
                <h3 className="customer-service-title">Customer Service</h3>
                <div className="customer-service-table-wrapper">
                    <table className="customer-service-table">
                        <tbody>
                            <tr className='tablerow'><td className="tableheader">User Type:</td><td className="tabledetail">{data.customerService.userType}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Fleet Type:</td><td className="tabledetail">{data.customerService.fleetType}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Transaction ID:</td><td className="tabledetail">{data.customerService.transactionId}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Service Type:</td><td className="tabledetail">{data.customerService.serviceType}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Type of Issue:</td><td className="tabledetail">{data.customerService.typeOfIssue}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Trip ID:</td><td className="tabledetail">{data.tripId}</td></tr>
                        </tbody>
                    </table>
                    <table className="customer-service-table">
                        <tbody>
                            <tr className='tablerow'><td className="tableheader">Incident Date:</td><td className="tabledetail">{data.customerService.incidentDate}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Incident Start Time:</td><td className="tabledetail">{data.customerService.startTime}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Incident End Time:</td><td className="tabledetail">{data.customerService.endTime}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Ticket Created On:</td><td className="tabledetail">{data.customerService.ticketDate}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Ticket Resolved By:</td><td className="tabledetail">{data.customerService.resolvedBy}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Ticket Resolved Date:</td><td className="tabledetail">{data.customerService.resolvedDate}</td></tr>
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
                            <tr className='tablerow'><td className="tableheader">Input By:</td><td className="tabledetail">{data.compliance.inputBy}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Verdict By:</td><td className="tabledetail">{data.compliance.verdictBy}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Suspension Start</td><td className="tabledetail">{data.compliance.suspensionStartDate}</td></tr>
                        </tbody>
                    </table>
                    <table className="customer-service-table">
                        <tbody>
                            <tr className='tablerow'><td className="tableheader">Reinstated By:</td><td className="tabledetail">{data.compliance.reinstatedBy}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Staff handling case</td><td className="tabledetail">{data.compliance.handler}</td></tr>
                            <tr className='tablerow'><td className="tableheader">Suspension End:</td><td className="tabledetail">{data.compliance.suspensionEndDate}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
