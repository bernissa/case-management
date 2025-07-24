import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockCaseList } from './mockCaseData'; // adjust import path as needed

export default function EditCase() {
    const { id } = useParams(); // e.g., 0002
    const [caseData, setCaseData] = useState(null);

    useEffect(() => {
        // Simulate fetching from mock data
        const selectedCase = mockCaseList.find((item) => item.id === id);
        setCaseData(selectedCase);
    }, [id]);
    

    const handleChange = (field, value) => {
        setCaseData({ ...caseData, [field]: value });
    };

    const handleNestedChange = (section, field, value) => {
        setCaseData({
            ...caseData,
            [section]: {
                ...caseData[section],
                [field]: value,
            },
        });
    };

    const handleSave = () => {
        console.log('Updated Case Data:', caseData);
        // In real usage, call API to save the update
    };

    if (!caseData) return <div>Loading...</div>;

    return (
        <div className="case-detail-grid-layout">

            {/* Header */}
            <div className="case-detail-item xlarge">
                <div className="case-add-driver-name">
                    <div>
                        <h2 className="">Edit Case</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className='add-case-label'>Driver Name</label>
                            <input
                                type="text"
                                value={caseData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Full Name of Violator"
                                className="add-case-input-search"
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className='add-case-label'>Trip ID</label>
                            <input
                                type="text"
                                value={caseData.tripId}
                                onChange={(e) => handleChange('tripId', e.target.value)}
                                placeholder="Trip ID"
                                className="add-case-input"
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className='add-case-label'>Type</label>
                            <select name="type" id="type" className='add-case-dropdown' onChange={(e) => handleChange('type', e.target.value)}>
                                <option value="Ride-Hailing" className='add-case-dropdown-option'>Ride-Hailing</option>
                                <option value="Delivery" className='add-case-dropdown-option'>Delivery</option>
                                <option value="Accident" className='add-case-dropdown-option'>Accident</option>
                            </select>
                        </div>
                    </div>
                    <img
                        src={caseData.driverImage}
                        alt="Driver"
                        className="case-detail-avatar"
                    />
                </div>  
            </div>

            {/* Remarks */}
            <div className="case-detail-full">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Full Name</label>
                    <input
                        type="text"
                        value={caseData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="name"
                        className="add-case-input"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Violation</label>
                    <input
                        type="text"
                        value={caseData.violation}
                        onChange={(e) => handleChange('violation', e.target.value)}
                        placeholder="violation"
                        className="add-case-input"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>Case Date -{caseData.customerService.incidentDate} </p>
                    <p>Case ID - {caseData.id}</p>
                </div>
            </div>

            {/* 3 Columns */}
            <div className="case-detail-item">
                <h3><strong>Violator Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>User ID</label>
                    <input
                        type="text"
                        value={caseData.driverId}
                        onChange={(e) => handleChange('driverId', e.target.value)}
                        placeholder="Driver ID"
                        className="add-case-input"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Contact No.</label>
                    <input
                        type="text"
                        value={caseData.contact}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        placeholder="contact"
                        className="add-case-input"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Email.</label>
                    <input
                        type="text"
                        value={caseData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="email"
                        className="add-case-input"
                    />
                </div>
            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Trip ID</label>
                    <input
                        type="text"
                        value={caseData.tripId}
                        onChange={(e) => handleChange('tripId', e.target.value)}
                        placeholder="Trip ID"
                        className="add-case-input"
                    />
                </div>

            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Status</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Status</label>
                    {/* <input type="dropdown" placeholder="Ride-Hailing, Delivery or Accident" className='add-case-input' /> */}
                    <select name="type" id="type" className='add-case-dropdown' value={caseData.status} onChange={(e) => handleChange('status', e.target.value)}>
                        <option value="Pending" className='add-case-dropdown-option'>Pending</option>
                        <option value="Resolved" className='add-case-dropdown-option'>Resolved</option>
                        <option value="Closed" className='add-case-dropdown-option'>Closed</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Verdict</label>
                    {/* <input type="dropdown" placeholder="Ride-Hailing, Delivery or Accident" className='add-case-input' /> */}
                    <select name="type" id="type" className='add-case-dropdown' value={caseData.action} onChange={(e) => handleChange('action', e.target.value)}>
                        <option value="WARNING" className='add-case-dropdown-option'>WARNING</option>
                        <option value="SUSPENSION" className='add-case-dropdown-option'>SUSPENSION</option>
                        <option value="BAN" className='add-case-dropdown-option'>BAN</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Type</label>
                    {/* <input type="dropdown" placeholder="Ride-Hailing, Delivery or Accident" className='add-case-input' /> */}
                    <select name="type" id="type" className='add-case-dropdown' onChange={(e) => handleChange('type', e.target.value)}>
                        <option value="Ride-Hailing" className='add-case-dropdown-option'>Ride-Hailing</option>
                        <option value="Delivery" className='add-case-dropdown-option'>Delivery</option>
                        <option value="Accident" className='add-case-dropdown-option'>Accident</option>
                    </select>
                </div>
            </div>

            <div className="case-detail-full">
                <h3 className="customer-service-title">Brief Remarks</h3>
                <div className="customer-service-table-wrapper">
                    <textarea className='add-case-textarea' placeholder='Enter remarks' value={caseData.remarks} onChange={(e) => handleChange('remarks', e.target.value)}></textarea>
                </div>
            </div>

            {/* Customer Service */}
            <div className="case-detail-full">
                <h3 className="customer-service-title">Customer Service</h3>
                <div className="customer-service-table-wrapper">
                    <table className="customer-service-table">
                        <tbody>
                            <tr><td className="">Source of the case:</td><td><input type="text" placeholder="Source" className='add-case-input-table' value={caseData.customerService.source} onChange={(e) => handleNestedChange('customerService', 'source', e.target.value)} /></td></tr>
                            <tr><td className="">User Type:</td><td><input type="text" placeholder="User Type" className='add-case-input-table' value={caseData.customerService.userType} onChange={(e) => handleNestedChange('customerService', 'userType', e.target.value)}/></td></tr>
                            <tr><td className="">Fleet Type:</td><td><input type="text" placeholder="Fleet Type" className='add-case-input-table' value={caseData.customerService.fleetType} onChange={(e) => handleNestedChange('customerService', 'fleetType', e.target.value)}/></td></tr>
                            <tr><td className="">Transaction ID:</td><td><input type="text" placeholder="Transaction ID" className='add-case-input-table' value={caseData.customerService.transactionId} onChange={(e) => handleNestedChange('customerService', 'transactionId', e.target.value)}/></td></tr>
                            <tr><td className="">Service Type:</td><td><input type="text" placeholder="Service Type" className='add-case-input-table' value={caseData.customerService.serviceType} onChange={(e) => handleNestedChange('customerService', 'serviceType', e.target.value)}/></td></tr>
                            <tr><td className="">Type of Issue:</td><td><input type="text" placeholder="Issue Type" className='add-case-input-table' value={caseData.customerService.issueType} onChange={(e) => handleNestedChange('customerService', 'issueType', e.target.value)}/></td></tr>
                        </tbody>
                    </table>
                    <table className="customer-service-table">
                        <tbody>
                            <tr><td className="">Incident Date:</td><td><input type="date" placeholder="Incident Date" className='add-case-input-table' value={caseData.customerService.incidentDate} onChange={(e) => handleNestedChange('customerService', 'incidentDate', e.target.value)}/></td></tr>
                            <tr><td className="">Start Time:</td><td><input type="time" placeholder="Start Time" className='add-case-input-table' value={caseData.customerService.startTime} onChange={(e) => handleNestedChange('customerService', 'startTime', e.target.value)}/></td></tr>
                            <tr><td className="">End Time:</td><td><input type="time" placeholder="End Time" className='add-case-input-table' value={caseData.customerService.endTime} onChange={(e) => handleNestedChange('customerService', 'endTime', e.target.value)}/></td></tr>
                            <tr><td className="">Resolved Date:</td><td><input type="date" placeholder="Resolved Date" className='add-case-input-table' value={caseData.customerService.resolvedDate} onChange={(e) => handleNestedChange('customerService', 'resolvedDate', e.target.value)}/></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Compliance */}
            <div className="case-detail-full">
                <h3 className="text-lg font-semibold mb-4">Compliance</h3>
                <div className="compliance-layout">
                    <div>
                        <p><strong>Input By:</strong><input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' value={caseData.compliance.inputBy} onChange={(e) => handleNestedChange('compliance', 'inputBy', e.target.value)}/></p>
                        <p><strong>Verdict By:</strong> <input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' value={caseData.compliance.verdictBy} onChange={(e) => handleNestedChange('compliance', 'verdictBy', e.target.value)}/></p>
                    </div>
                    <div>
                        <p><strong>Reinstated By:</strong> <input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' value={caseData.compliance.reinstatedBy} onChange={(e) => handleNestedChange('compliance', 'reinstatedBy', e.target.value)}/></p>
                        <p><strong>Staff handling case:</strong> <input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' value={caseData.compliance.staffHandling} onChange={(e) => handleNestedChange('compliance', 'staffHandling', e.target.value)}/></p>
                    </div>
                </div>
            </div>
            <div className='case-detail-full-nobg align-center'>
                <button className="btn-main add-btn" onClick={handleSave}>UPDATE</button>
            </div>
        </div>

    );
}
