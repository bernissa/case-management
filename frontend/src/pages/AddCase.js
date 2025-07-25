import React, { useState } from 'react';
import infoicon from '../assets/material-symbols_info.png';

export default function AddCase() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="case-detail-grid-layout">
            {/* Header */}
            <div className="case-detail-item xlarge">
                <div className="case-add-driver-name">
                    <div style={{ display: "flex", flexDirection: "column",  gap: "16px" }}>
                        <img
                            src={imagePreview || "http://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png"}
                            alt="Driver Preview"
                            className="case-detail-avatar"
                        />
                    </div>
                    <div>
                        <h2 className="">Add a Case</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className='add-case-label'>Full Name</label>
                            <input type="text" placeholder="Enter a User Name or ID" className='add-case-input-search' />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label className='add-case-label'>Trip ID</label>
                            <input type="text" placeholder="Enter a Trip ID" className='add-case-input-search' />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <label className='add-case-label'>Type</label>
                                <img src={infoicon} alt="Info Icon" className="info-icon"/>
                            </div>
                            
                            <select name="type" id="type" className='add-case-dropdown'>
                                <option value="Ride-Hailing" className='add-case-dropdown-option'>Ride-Hailing</option>
                                <option value="Delivery" className='add-case-dropdown-option'>Delivery</option>
                                <option value="Accident" className='add-case-dropdown-option'>Accident</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Remarks */}
            <div className="case-detail-full">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Full Name</label>
                    <input type="text" placeholder="Full Name of Violator" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Violation</label>
                    <input type="text" placeholder="Violation" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>Case Date - </p>
                    <p>Case ID - </p>
                </div>
            </div>

            {/* 3 Columns */}
            <div className="case-detail-item">
                <h3><strong>Violator Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>User ID</label>
                    <input type="text" placeholder="ID of User" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Contact No.</label>
                    <input type="text" placeholder="Contact Number" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Email.</label>
                    <input type="text" placeholder="Email Address" className='add-case-input' />
                </div>
            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>User ID</label>
                    <input type="text" placeholder="ID of User" className='add-case-input' />
                </div>
            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Status</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Status</label>
                    <select name="type" id="type" className='add-case-dropdown'>
                        <option value="Pending" className='add-case-dropdown-option'>Pending</option>
                        <option value="Resolved" className='add-case-dropdown-option'>Resolved</option>
                        <option value="Closed" className='add-case-dropdown-option'>Closed</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Verdict</label>
                    <select name="type" id="type" className='add-case-dropdown'>
                        <option value="WARNING" className='add-case-dropdown-option'>WARNING</option>
                        <option value="SUSPENSION" className='add-case-dropdown-option'>SUSPENSION</option>
                        <option value="BAN" className='add-case-dropdown-option'>BAN</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Type</label>
                    <select name="type" id="type" className='add-case-dropdown'>
                        <option value="Ride-Hailing" className='add-case-dropdown-option'>Ride-Hailing</option>
                        <option value="Delivery" className='add-case-dropdown-option'>Delivery</option>
                        <option value="Accident" className='add-case-dropdown-option'>Accident</option>
                    </select>
                </div>
            </div>

            <div className="case-detail-full">
                <h3 className="customer-service-title">Brief Remarks</h3>
                <div className="customer-service-table-wrapper">
                    <textarea className='add-case-textarea' placeholder='Enter remarks'></textarea>
                </div>
            </div>

            {/* Customer Service */}
            <div className="case-detail-full">
                <h3 className="customer-service-title">Customer Service</h3>
                <div className="customer-service-table-wrapper">
                    <table className="customer-service-table">
                        <tbody>
                            <tr><td className="">Source of the case:</td><td><input type="text" placeholder="Source" className='add-case-input-table' /></td></tr>
                            <tr><td className="">User Type:</td><td><input type="text" placeholder="User Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Fleet Type:</td><td><input type="text" placeholder="Fleet Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Transaction ID:</td><td><input type="text" placeholder="Transaction ID" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Service Type:</td><td><input type="text" placeholder="Service Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Type of Issue:</td><td><input type="text" placeholder="Issue Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Trip ID:</td><td><input type="text" placeholder="Auto" className='add-case-input-table' disabled /></td></tr>
                        </tbody>
                    </table>
                    <table className="customer-service-table">
                        <tbody>
                            <tr><td className="">Incident Date:</td><td><input type="date" placeholder="Incident Date" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Start Time:</td><td><input type="time" placeholder="Start Time" className='add-case-input-table' /></td></tr>
                            <tr><td className="">End Time:</td><td><input type="time" placeholder="End Time" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Resolved Date:</td><td><input type="date" placeholder="Resolved Date" className='add-case-input-table' /></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Compliance */}
            <div className="case-detail-full">
                <h3 className="text-lg font-semibold mb-4">Compliance</h3>
                <div className="compliance-layout">
                    <div>
                        <p><strong>Input By:</strong><input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' /></p>
                        <p><strong>Verdict By:</strong> <input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' /></p>
                    </div>
                    <div>
                        <p><strong>Reinstated By:</strong> <input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' /></p>
                        <p><strong>Staff handling case:</strong> <input type="text" placeholder="Name" className='add-case-input margintop8px compliance-input' /></p>
                    </div>
                </div>
            </div>

            <div className='case-detail-full-nobg align-center'>
                <button className="btn-main add-btn">ADD CASE</button>
            </div>
        </div>
    );
}
