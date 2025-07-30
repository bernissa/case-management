import React, { useState } from 'react';
import { userData } from './userData'
import { mockCaseList } from './mockCaseData';
import Select from 'react-select';

export default function AddCase() {
    const [selectedImage, setSelectedImage] = useState(null);

    const [formInputs, setFormInputs] = useState({
        source: '',
        tripId: '',
        violation: '',
        status: '',
        action: '',
        duration: '',
        remarks: '',
        customerService: {
            userType: '',
            fleetType: '',
            transactionId: '',
            serviceType: '',
            typeOfIssue: '',
            incidentDate: '',
            startTime: '',
            endTime: '',
            ticketDate: '',
            resolvedBy: '',
            resolvedDate: '',
        },
        compliance: {
            inputBy: '',
            verdictBy: '',
            reinstatedBy: '',
            handler: '',
            suspensionStartDate: '',
            suspensionEndDate: '',
        }
    });

    const [driverDetails, setDriverDetails] = useState({
        name: '',
        type: '',
        driverId: '',
        contact: '',
        email: ''
    });

    const handleAddCase = () => {
        const newCaseId = (mockCaseList.length + 1).toString().padStart(4, '0');
        const today = new Date();
        const currentDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

        const newCase = {
            id: newCaseId,
            name: driverDetails.name || '',
            driverImage: driverDetails.driverImage || '',
            type: driverDetails.type || '',
            source: formInputs.source || '',
            effectDate: currentDate,
            driverId: driverDetails.driverId || '',
            contact: driverDetails.contact || '',
            email: driverDetails.email || '',
            tripId: formInputs.tripId || '',
            violation: formInputs.violation || '',
            status: formInputs.status || '',
            action: formInputs.action || '',
            duration: formInputs.duration || '',
            remarks: formInputs.remarks || '',
            customerService: {
                // userType: formInputs.customerService?.userType || '',
                userType: driverDetails.userType || '',
                fleetType: driverDetails.fleetType || '',
                transactionId: formInputs.customerService?.transactionId || '',
                serviceType: formInputs.customerService?.serviceType || '',
                typeOfIssue: formInputs.customerService?.typeOfIssue || '',
                incidentDate: formInputs.customerService?.incidentDate || '',
                startTime: formInputs.customerService?.startTime || '',
                endTime: formInputs.customerService?.endTime || '',
                ticketDate: formInputs.customerService?.ticketDate || '',
                resolvedBy: formInputs.customerService?.resolvedBy || '',
                resolvedDate: formInputs.customerService?.resolvedDate || '',
            },
            compliance: {
                inputBy: formInputs.compliance?.inputBy || '',
                verdictBy: formInputs.compliance?.verdictBy || '',
                reinstatedBy: formInputs.compliance?.reinstatedBy || '',
                handler: formInputs.compliance?.handler || '',
                suspensionStartDate: formInputs.compliance?.suspensionStartDate || '',
                suspensionEndDate: formInputs.compliance?.suspensionEndDate || '',
            }
        };

        mockCaseList.push(newCase);
        console.log('✅ Case added:', newCase);
        alert('Case added!');
        // const storedCases = JSON.parse(localStorage.getItem('cases')) || [];
        // storedCases.push(newCase);
        // localStorage.setItem('cases', JSON.stringify(storedCases));
    };


    return (
        <div className="case-detail-grid-layout">
            {/* Header */}
            <div className="case-detail-item xlarge case-add-header" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <h2 className="">Add Case</h2>
                <div className="case-add-driver-name" style={{ alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <img
                            src={selectedImage || "http://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png"}
                            alt="Driver Preview"
                            className="case-detail-avatar"
                        />

                    </div>
                    <div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                            <label className='add-case-label'>Full Name</label>
                            <Select
                                options={userData.map(d => ({
                                    value: d.driverId,
                                    label: `${d.name} (${d.driverId})`,
                                    driverData: d
                                }))}
                                onChange={(selectedOption) => {
                                    if (selectedOption) {
                                        setSelectedImage(selectedOption.driverData.driverImage);
                                        setDriverDetails(selectedOption.driverData);
                                    } else {
                                        // If cleared
                                        setSelectedImage(null);
                                        setDriverDetails({});
                                    }
                                }}
                                placeholder="Select Driver"
                                isClearable
                                classNamePrefix="add-case-input-search"
                            />

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <label className='add-case-label'>Type</label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z" fill="black" />
                                </svg>
                            </div>

                            <select name="type" id="type" className='add-case-dropdown' value={driverDetails.type || ''} disabled>
                                <option value="Ride-Hailing" className='add-case-dropdown-option'>Ride-Hailing</option>
                                <option value="Delivery" className='add-case-dropdown-option'>Delivery</option>
                                <option value="Accident" className='add-case-dropdown-option'>Accident</option>
                            </select>

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <label className='add-case-label'>Source of the case</label>
                            </div>

                            <select name="type" id="type" className='add-case-dropdown' value={formInputs.source} onChange={(e) => setFormInputs({ ...formInputs, source: e.target.value })}>
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
                    <input type="text" value={driverDetails.driverId || ''} placeholder="User ID" className='add-case-input' readOnly />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Contact No.</label>
                    <input type="text" value={driverDetails.contact || ''} placeholder="Contact Number" className='add-case-input' readOnly />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Email</label>
                    <input type="text" value={driverDetails.email || ''} placeholder="Email Address" className='add-case-input' readOnly />
                </div>
            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Details</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Case ID</label>
                    <input type="text" placeholder="Case ID" className='add-case-input' disabled style={{ background: "#D9D9D9" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Trip ID</label>
                    <input type="text" placeholder="ID of Trip" className='add-case-input' value={formInputs.tripId} onChange={(e) => setFormInputs({ ...formInputs, tripId: e.target.value })} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Violation</label>
                    <input type="text" placeholder="Violation" className='add-case-input' value={formInputs.violation} onChange={(e) => setFormInputs({ ...formInputs, violation: e.target.value })} />
                </div>
            </div>

            <div className="case-detail-item-flex-start">
                <h3><strong>Case Status</strong></h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className='add-case-label'>Status</label>
                    <select name="type" id="type" className='add-case-dropdown' value={formInputs.status} onChange={(e) => setFormInputs({ ...formInputs, status: e.target.value })}>
                        <option value="Pending" className='add-case-dropdown-option'>Pending</option>
                        <option value="Resolved" className='add-case-dropdown-option'>Resolved</option>
                        <option value="Closed" className='add-case-dropdown-option'>Closed</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Follow-Up-Action</label>
                    <select name="type" id="type" className='add-case-dropdown' value={formInputs.action} onChange={(e) => setFormInputs({ ...formInputs, action: e.target.value })}>
                        <option value="WARNING" className='add-case-dropdown-option'>WARNING</option>
                        <option value="SUSPENSION" className='add-case-dropdown-option'>SUSPENSION</option>
                        <option value="BAN" className='add-case-dropdown-option'>BAN</option>
                    </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <label className='add-case-label'>Duration</label>
                    <select name="type" id="type" className='add-case-dropdown' value={formInputs.duration} onChange={(e) => setFormInputs({ ...formInputs, duration: e.target.value })}>
                        <option value="None" className='add-case-dropdown-option'>None</option>
                        <option value="6 Months" className='add-case-dropdown-option'>6 Months</option>
                        <option value="Permanent" className='add-case-dropdown-option'>Permanent</option>
                    </select>
                </div>
            </div>

            <div className="case-detail-full">
                <h3 className="customer-service-title">Brief Remarks</h3>
                <div className="customer-service-table-wrapper">
                    <textarea className='add-case-textarea' placeholder='Enter remarks' value={formInputs.remarks} onChange={(e) => setFormInputs({ ...formInputs, remarks: e.target.value })}></textarea>
                </div>
            </div>

            {/* Customer Service */}
            <div className="case-detail-full">
                <h3 className="customer-service-title">Customer Service</h3>
                <div className="cs-and-compliance-table-wrapper">
                    <table className="cs-and-compliance-table">
                        <tbody>
                            <tr className="tablerow"><td className="tableheader">User Type:</td><td className='tabledetail'><input type="text" placeholder="User Type" value={driverDetails.userType} className='add-case-input-table' /></td></tr>
                            <tr className="tablerow">
                                <td className="tableheader">Fleet Type:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Fleet Type"
                                        className='add-case-input-table'
                                        value={driverDetails.fleetType}
                                    />
                                </td>
                            </tr>
                            <tr className="tablerow">
                                <td className="tableheader">Transaction ID:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Transaction ID"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.transactionId || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                transactionId: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Service Type:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Service Type"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.serviceType || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                serviceType: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Type of Issue:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Issue Type"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.typeOfIssue || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                typeOfIssue: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Trip ID:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Auto"
                                        className='add-case-input-table'
                                        value={formInputs.tripId || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="cs-and-compliance-table">
                        <tbody>
                            <tr className="tablerow">
                                <td className="tableheader">Incident Date:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="date"
                                        placeholder="Incident Date"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.incidentDate || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                incidentDate: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Start Time:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="time"
                                        placeholder="Start Time"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.startTime || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                startTime: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">End Time:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="time"
                                        placeholder="End Time"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.endTime || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                endTime: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Ticket Created On:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="date"
                                        placeholder="Created On"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.ticketDate || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                ticketDate: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Ticket Resolved By:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Resolved By"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.resolvedBy || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                resolvedBy: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Resolved Date:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="date"
                                        placeholder="Resolved Date"
                                        className='add-case-input-table'
                                        value={formInputs.customerService.resolvedDate || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            customerService: {
                                                ...formInputs.customerService,
                                                resolvedDate: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>
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
                            <tr className="tablerow">
                                <td className="tableheader">Input By:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Input By"
                                        className='add-case-input-table'
                                        value={formInputs.compliance.inputBy || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            compliance: {
                                                ...formInputs.compliance,
                                                inputBy: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Verdict By:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Verdict by"
                                        className='add-case-input-table'
                                        value={formInputs.compliance.verdictBy || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            compliance: {
                                                ...formInputs.compliance,
                                                verdictBy: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Suspension Start Date:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="date"
                                        placeholder="Suspension Start Date"
                                        className='add-case-input-table'
                                        value={formInputs.compliance.suspensionStartDate || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            compliance: {
                                                ...formInputs.compliance,
                                                suspensionStartDate: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <table className="cs-and-compliance-table">
                        <tbody>
                            <tr className="tablerow">
                                <td className="tableheader">Reinstated By:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Reinstated By"
                                        className='add-case-input-table'
                                        value={formInputs.compliance.reinstatedBy || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            compliance: {
                                                ...formInputs.compliance,
                                                reinstatedBy: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Staff handling case:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="text"
                                        placeholder="Staff name"
                                        className='add-case-input-table'
                                        value={formInputs.compliance.handler || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            compliance: {
                                                ...formInputs.compliance,
                                                handler: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                            <tr className="tablerow">
                                <td className="tableheader">Suspension End Date:</td>
                                <td className='tabledetail'>
                                    <input
                                        type="date"
                                        placeholder="Suspension End Date"
                                        className='add-case-input-table'
                                        value={formInputs.compliance.suspensionEndDate || ''}
                                        onChange={(e) => setFormInputs({
                                            ...formInputs,
                                            compliance: {
                                                ...formInputs.compliance,
                                                suspensionEndDate: e.target.value
                                            }
                                        })}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className='case-detail-full-nobg align-center'>
                {/* <button className="btn-main add-btn">ADD CASE</button> */}
                <button onClick={handleAddCase} className='btn-main add-btn'>Add Case</button>

            </div>
        </div>
    );
}
