import React, { useState } from 'react';

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
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px"}}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <label className='add-case-label'>Type</label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z" fill="black"/>
                                </svg>
                            </div>
                            
                            <select name="type" id="type" className='add-case-dropdown'>
                                <option value="Ride-Hailing" className='add-case-dropdown-option'>Ride-Hailing</option>
                                <option value="Delivery" className='add-case-dropdown-option'>Delivery</option>
                                <option value="Accident" className='add-case-dropdown-option'>Accident</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px"}}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <label className='add-case-label'>Source of the case</label>
                            </div>
                            
                            <select name="type" id="type" className='add-case-dropdown'>
                                <option value="Walk-In" className='add-case-dropdown-option'>Walk-In</option>
                                <option value="Email" className='add-case-dropdown-option'>Email</option>
                                <option value="Hotline" className='add-case-dropdown-option'>In-App Chat</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3 Columns */}
            <div className="case-detail-item">
                <h3><strong>Violator Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>User ID</label>
                    <input type="text" placeholder="User ID" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Contact No.</label>
                    <input type="text" placeholder="Contact Number" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Email</label>
                    <input type="text" placeholder="Email Address" className='add-case-input' />
                </div>
            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px"}}>
                    <label className='add-case-label'>Case ID</label>
                    <input type="text" placeholder="Case ID" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Trip ID</label>
                    <input type="text" placeholder="ID of User" className='add-case-input' />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Violation</label>
                    <input type="text" placeholder="Violation" className='add-case-input' />
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
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Verdict</label>
                    <select name="type" id="type" className='add-case-dropdown'>
                        <option value="WARNING" className='add-case-dropdown-option'>WARNING</option>
                        <option value="SUSPENSION" className='add-case-dropdown-option'>SUSPENSION</option>
                        <option value="BAN" className='add-case-dropdown-option'>BAN</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Duration</label>
                    <select name="type" id="type" className='add-case-dropdown'>
                        <option value="None" className='add-case-dropdown-option'>None</option>
                        <option value="6 Months" className='add-case-dropdown-option'>6 Months</option>
                        <option value="Permanent" className='add-case-dropdown-option'>Permanent</option>
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
                <div className="cs-and-compliance-table-wrapper">
                    <table className="cs-and-compliance-table">
                        <tbody>
                            <tr><td className="">User Type:</td><td><input type="text" placeholder="User Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Fleet Type:</td><td><input type="text" placeholder="Fleet Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Transaction ID:</td><td><input type="text" placeholder="Transaction ID" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Service Type:</td><td><input type="text" placeholder="Service Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Type of Issue:</td><td><input type="text" placeholder="Issue Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Trip ID:</td><td><input type="text" placeholder="Auto" className='add-case-input-table' disabled /></td></tr>
                        </tbody>
                    </table>
                    <table className="cs-and-compliance-table">
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
                <div className="cs-and-compliance-table-wrapper">
                    <table className="cs-and-compliance-table">
                        <tbody>
                            <tr><td className="">Input By:</td><td><input type="text" placeholder="Source" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Verdict By:</td><td><input type="text" placeholder="User Type" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Suspension Start Date:</td><td><input type="date" placeholder="Suspension Start Date" className='add-case-input-table' /></td></tr>
                        </tbody>
                    </table>
                    <table className="cs-and-compliance-table">
                        <tbody>
                            <tr><td className="">Reinstated By:</td><td><input type="date" placeholder="Incident Date" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Staff handling case:</td><td><input type="time" placeholder="Start Time" className='add-case-input-table' /></td></tr>
                            <tr><td className="">Suspension End Date:</td><td><input type="date" placeholder="Suspension End Date" className='add-case-input-table' /></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='case-detail-full-nobg align-center'>
                <button className="btn-main add-btn">ADD CASE</button>
            </div>
        </div>
    );
}
