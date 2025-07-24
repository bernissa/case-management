import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCaseList } from './mockCaseData'; // update this path accordingly

export default function CaseDetailPage() {
    const { id } = useParams();
    const data = mockCaseList.find(c => c.id === id);

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
                        // src="https://i.pravatar.cc/100?img=3"
                        src={data.driverImage}
                        alt="Driver"
                        className="case-detail-avatar"
                    />
                    <div>
                        {/* <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2> */}
                        {/* <h2 className="name-link highlight-text"><Link to={`/record/${data.driverId}`} className="name-link highlight-text">{data.name}</Link></h2> */}
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

                        <p className="red-text">Violation: {data.violation}</p>
                        <p className="text-sm text-gray-500">Case Date – {data.effectDate}</p>
                    </div>
                </div>
                {/* <a href='/editcase'><button className="btn-main">EDIT CASE</button></a> */}
                <Link to={`/editcase/${id}`}>
                    <button className="btn-main">EDIT CASE</button>
                </Link>
            </div>

            {/* 3 Columns */}
            <div className="case-detail-item">
                <h3><strong>Violator Details</strong></h3>
                <p><strong>Driver ID:</strong> {data.driverId}</p>
                <p><strong>Contact:</strong> {data.contact}</p>
                <p><strong>Email:</strong> {data.email}</p>
            </div>

            <div className="case-detail-item">
                <h3><strong>Case Details</strong></h3>
                <p><strong>Case ID:</strong> {data.id}</p>
                <p><strong>Trip ID:</strong> {data.tripId}</p>
                <p><strong>Type:</strong> {data.type}</p>
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
                            <tr><td className="font-semibold pr-2">Source of the case:</td><td>{data.customerService.source}</td></tr>
                            <tr><td className="font-semibold pr-2">User Type:</td><td>{data.customerService.userType}</td></tr>
                            <tr><td className="font-semibold pr-2">Fleet Type:</td><td>{data.customerService.fleetType}</td></tr>
                            <tr><td className="font-semibold pr-2">Transaction ID:</td><td>{data.customerService.transactionId}</td></tr>
                            <tr><td className="font-semibold pr-2">Service Type:</td><td>{data.customerService.serviceType}</td></tr>
                            <tr><td className="font-semibold pr-2">Type of Issue:</td><td>{data.customerService.typeOfIssue}</td></tr>
                            <tr><td className="font-semibold pr-2">Trip ID:</td><td>{data.tripId}</td></tr>
                        </tbody>
                    </table>
                    <table className="customer-service-table">
                        <tbody>
                            <tr><td className="font-semibold pr-2">Incident Date:</td><td>{data.customerService.incidentDate}</td></tr>
                            <tr><td className="font-semibold pr-2">Start Time:</td><td>{data.customerService.startTime}</td></tr>
                            <tr><td className="font-semibold pr-2">End Time:</td><td>{data.customerService.endTime}</td></tr>
                            <tr><td className="font-semibold pr-2">Resolved Date:</td><td>{data.customerService.resolvedDate}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Compliance */}
            <div className="case-detail-full">
                <h3 className="text-lg font-semibold mb-4">Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                        <p><strong>Input By:</strong> {data.compliance.inputBy}</p>
                        <p><strong>Verdict By:</strong> {data.compliance.verdictBy}</p>
                    </div>
                    <div>
                        <p><strong>Reinstated By:</strong> {data.compliance.reinstatedBy}</p>
                        <p><strong>Staff handling case:</strong> {data.compliance.handler}</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

