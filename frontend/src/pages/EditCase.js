    import React, { useState, useEffect } from 'react';
    import Select from 'react-select';
    import { useNavigate, useParams } from 'react-router-dom';
    import axios from 'axios';

    export default function EditCase() {
        const { id } = useParams();
        const [selectedImage, setSelectedImage] = useState(null);
        const navigate = useNavigate();

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
            userId: '',
            contact: '',
            email: '',
            driverImage: '', // Add driverImage field
        });

        const handleUpdateCase = async () => {
            const today = new Date();
            const currentDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

            const updatedCase = {
                profile: driverDetails.profile || '',
                name: driverDetails.name || '',
                type: driverDetails.type || '',
                source: formInputs.source || '',
                effectDate: currentDate,
                userId: driverDetails.userId || '',
                contact: driverDetails.contact || '',
                email: driverDetails.email || '',
                tripId: formInputs.tripId || '',
                violation: formInputs.violation || '',
                status: formInputs.status || '',
                action: formInputs.action || '',
                duration: formInputs.duration || '',
                remarks: formInputs.remarks || '',
                customerService: {
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

            try {
                const response = await axios.put(`http://localhost:5000/api/cases/${id}`, updatedCase); // change URL to your actual backend route
                console.log('✅ Case updated:', response.data);
                alert('Case successfully updated!');
                navigate('/cases');
            } catch (error) {
                console.error('❌ Failed to update case:', error);
                alert('Failed to update case. Please try again.');
            }
        };

        useEffect(() => {
            axios.get(`http://localhost:5000/api/cases/${id}`)
                .then(res => {
                    const caseData = res.data;

                    // Set form inputs
                    setFormInputs({
                        source: caseData.source,
                        tripId: caseData.tripId,
                        violation: caseData.violation,
                        status: caseData.status,
                        action: caseData.action,
                        duration: caseData.duration,
                        remarks: caseData.remarks,
                        customerService: caseData.customerService,
                        compliance: caseData.compliance
                    });

                    // Ensure userType and fleetType are set correctly from customerService
                    setDriverDetails({
                        name: caseData.name,
                        type: caseData.type,
                        userId: caseData.userId,
                        contact: caseData.contact,
                        email: caseData.email,
                        driverImage: caseData.profile,
                        userType: caseData.customerService.userType || '', // Ensure userType is set
                        fleetType: caseData.customerService.fleetType || ''  // Ensure fleetType is set
                    });

                    // Set the selected image
                    setSelectedImage(caseData.profile);
                })
                .catch(error => {
                    console.error('❌ Failed to fetch case data:', error);
                    alert('Failed to fetch case data. Please try again.');
                });
        }, [id]);

        const [userOptions, setUserOptions] = useState([]);
        useEffect(() => {
            axios.get('http://localhost:5000/api/users') // adjust URL as needed
                .then(res => {
                    const options = res.data.map(driver => ({
                        value: driver.userId,
                        label: `${driver.name} (${driver.userId})`,
                        driverData: driver
                    }));
                    setUserOptions(options);
                });
        }, []);

        return (
            <div className="case-detail-grid-layout">
                {/* Header */}
                <div className="case-detail-item xlarge case-add-header" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <h2 className="">Edit Case</h2>
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
                                    options={userOptions}
                                    value={userOptions.find(option => option.value === driverDetails.userId)}
                                    onChange={(selectedOption) => {
                                        if (selectedOption) {
                                            setSelectedImage(selectedOption.driverData.profile);
                                            setDriverDetails(selectedOption.driverData);
                                        } else {
                                            setSelectedImage(null);
                                            setDriverDetails({});
                                        }
                                    }}
                                    placeholder="Select Driver"
                                    isClearable
                                    classNamePrefix="add-case-input-search"
                                />
                            </div>

                            {/* Driver Type - editable */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                                <label className='add-case-label'>Type</label>
                                <select
                                    name="type"
                                    id="type"
                                    className='add-case-dropdown'
                                    value={driverDetails.type || ''}
                                    onChange={(e) => setDriverDetails({ ...driverDetails, type: e.target.value })}
                                >
                                    <option value="Ride-Hailing">Ride-Hailing</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Accident">Accident</option>
                                </select>
                            </div>

                            {/* Source of the Case */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                                <label className='add-case-label'>Source of the Case</label>
                                <select
                                    name="source"
                                    className='add-case-dropdown'
                                    value={formInputs.source}
                                    onChange={(e) => setFormInputs({ ...formInputs, source: e.target.value })}
                                >
                                    <option value="-" className='add-case-dropdown-option'>-</option>
                                    <option value="Walk-In" className='add-case-dropdown-option'>Walk-In</option>
                                    <option value="Email" className='add-case-dropdown-option'>Email</option>
                                    <option value="In-App Chat" className='add-case-dropdown-option'>In-App Chat</option>
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
                        <input type="text" value={driverDetails.userId || ''} placeholder="User ID" className='add-case-input' readOnly />
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
                        <input
                            type="text"
                            value={id}
                            placeholder="Case ID"
                            className='add-case-input'
                            disabled
                            style={{ background: "#D9D9D9" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        <label className='add-case-label'>Trip ID</label>
                        <input
                            type="text"
                            placeholder="ID of Trip"
                            className='add-case-input'
                            value={formInputs.tripId}
                            onChange={(e) => setFormInputs({ ...formInputs, tripId: e.target.value })}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        <label className='add-case-label'>Violation</label>
                        <input
                            type="text"
                            placeholder="Violation"
                            className='add-case-input'
                            value={formInputs.violation}
                            onChange={(e) => setFormInputs({ ...formInputs, violation: e.target.value })}
                        />
                    </div>
                </div>

                {/* Case Status */}
                <div className="case-detail-item-flex-start">
                    <h3><strong>Case Status</strong></h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label className='add-case-label'>Status</label>
                        <select
                            name="status"
                            id="status"
                            className='add-case-dropdown'
                            value={formInputs.status}
                            onChange={(e) => setFormInputs({ ...formInputs, status: e.target.value })}
                        >
                            <option value="-" className='add-case-dropdown-option'>-</option>
                            <option value="Pending" className='add-case-dropdown-option'>Pending</option>
                            <option value="Resolved" className='add-case-dropdown-option'>Resolved</option>
                            <option value="Closed" className='add-case-dropdown-option'>Closed</option>
                        </select>
                    </div>

                    {/* Verdict */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        <label className='add-case-label'>Verdict</label>
                        <select
                            name="action"
                            id="action"
                            className='add-case-dropdown'
                            value={formInputs.action}
                            onChange={(e) => setFormInputs({ ...formInputs, action: e.target.value })}
                        >
                            <option value="-" className='add-case-dropdown-option'>-</option>
                            <option value="WARNING" className='add-case-dropdown-option'>WARNING</option>
                            <option value="SUSPENSION" className='add-case-dropdown-option'>SUSPENSION</option>
                            <option value="BAN" className='add-case-dropdown-option'>BAN</option>
                        </select>
                    </div>

                    {/* Duration */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                        <label className='add-case-label'>Duration</label>
                        <select
                            name="duration"
                            id="duration"
                            className='add-case-dropdown'
                            value={formInputs.duration}
                            onChange={(e) => setFormInputs({ ...formInputs, duration: e.target.value })}
                        >
                            <option value="-" className='add-case-dropdown-option'>-</option>
                            <option value="None" className='add-case-dropdown-option'>None</option>
                            <option value="6 Months" className='add-case-dropdown-option'>6 Months</option>
                            <option value="Permanent" className='add-case-dropdown-option'>Permanent</option>
                        </select>
                    </div>
                </div>

                {/* Brief Remarks */}
                <div className="case-detail-full">
                    <h3 className="customer-service-title">Brief Remarks</h3>
                    <div className="customer-service-table-wrapper">
                        <textarea
                            className='add-case-textarea'
                            placeholder='Enter remarks'
                            value={formInputs.remarks}
                            onChange={(e) => setFormInputs({ ...formInputs, remarks: e.target.value })}
                        ></textarea>
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
                                            placeholder="Verdict By"
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
                    <button onClick={handleUpdateCase} className='btn-main add-btn'>UPDATE</button>
                </div>
            </div>
        );
    }
