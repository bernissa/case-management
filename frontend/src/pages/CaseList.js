import React, { useState } from 'react';
import '../styles.css';
import { FiFilter, FiEdit2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { mockCaseList } from './mockCaseData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';

export default function CaseList() {
    const [showFilters, setShowFilters] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const casesPerPage = 5;

    const [filterType, setFilterType] = useState("ALL");
    const handleFilterTabClick = (type) => {
        setFilterType(type);
        setCurrentPage(1); // Reset to page 1 when switching tab
    };


    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/cases/${id}`);
    };

    // const filteredCases = filterType === 'ALL'
    //     ? mockCaseList
    //     : mockCaseList.filter((item) => item.type === filterType);

    const [searchName, setSearchName] = useState('');
    const [driverIdFilter, setDriverIdFilter] = useState('');
    const [caseIdFilter, setCaseIdFilter] = useState('');
    const [tripIdFilter, setTripIdFilter] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [actionFilter, setActionFilter] = useState('');
    const [repeatOffenderOnly, setRepeatOffenderOnly] = useState(false); // if applicable

    const clearFilters = () => {
        setSearchName('');
        setDriverIdFilter('');
        setCaseIdFilter('');
        setTripIdFilter('');
        setFromDate('');
        setToDate('');
        setStatusFilter('');
        setActionFilter('');
        setRepeatOffenderOnly(false);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchName, driverIdFilter, caseIdFilter, tripIdFilter, fromDate, toDate, statusFilter, actionFilter, repeatOffenderOnly]);

    const filteredCases = mockCaseList.filter((item) => {
        const matchesType = filterType === 'ALL' || item.type === filterType;
        const matchesName = item.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesDriverId = item.driverId.includes(driverIdFilter);
        const matchesCaseId = item.id.toString().includes(caseIdFilter); // assuming case ID is item.id
        const matchesTripId = item.tripId.includes(tripIdFilter);
        const matchesStatus = statusFilter === '' || item.status === statusFilter;
        const matchesAction = actionFilter === '' || item.action === actionFilter;
        const matchesFromDate = fromDate === '' || new Date(item.effectDate) >= new Date(fromDate);
        const matchesToDate = toDate === '' || new Date(item.effectDate) <= new Date(toDate);
        const matchesRepeat = !repeatOffenderOnly || item.repeatOffender === true;

        return (
            matchesType &&
            matchesName &&
            matchesDriverId &&
            matchesCaseId &&
            matchesTripId &&
            matchesStatus &&
            matchesAction &&
            matchesFromDate &&
            matchesToDate &&
            matchesRepeat
        );
    });



    // Pagination Logic
    const totalCases = filteredCases.length;
    const totalPages = Math.ceil(totalCases / casesPerPage);
    const indexOfLastCase = currentPage * casesPerPage;
    const indexOfFirstCase = indexOfLastCase - casesPerPage;
    const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);


    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const totalCount = mockCaseList.length;
    const rideHailingCount = mockCaseList.filter(item => item.type === "Ride-Hailing").length;
    const deliveryCount = mockCaseList.filter(item => item.type === "Delivery").length;
    const accidentCount = mockCaseList.filter(item => item.type === "Accident").length;

    


    return (
        <div className="case-list-container">
            {/* Top Tabs */}
            <div className="case-tabs">
                <button
                    className={`tab ${filterType === 'ALL' ? 'active' : ''}`}
                    onClick={() => handleFilterTabClick('ALL')}
                >
                    ALL CASES ({totalCount})
                </button>
                <button
                    className={`tab ${filterType === 'Ride-Hailing' ? 'active' : ''}`}
                    onClick={() => handleFilterTabClick('Ride-Hailing')}
                >
                    RIDE HAILING ({rideHailingCount})
                </button>
                <button
                    className={`tab ${filterType === 'Delivery' ? 'active' : ''}`}
                    onClick={() => handleFilterTabClick('Delivery')}
                >
                    DELIVERY ({deliveryCount})
                </button>
                <button
                    className={`tab ${filterType === 'Accident' ? 'active' : ''}`}
                    onClick={() => handleFilterTabClick('Accident')}
                >
                    ACCIDENTS ({accidentCount})
                </button>
            </div>



            {/* Filters */}
            <div className="filter-section">
                <div className="filter-header" onClick={() => setShowFilters(!showFilters)}>
                    <FiFilter />
                    <span>Filters</span>
                    {showFilters ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                {showFilters && (
                    <div className="filters">
                        <div className="">
                            <div className='search-container'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                                <input
                                    type="text"
                                    placeholder="Search Driver Name"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="filter-row">
                            <input
                                type="text"
                                placeholder="Driver ID"
                                value={driverIdFilter}
                                onChange={(e) => setDriverIdFilter(e.target.value)}
                                className='filter-input'
                            />
                            <input
                                type="text"
                                placeholder="Case ID"
                                value={caseIdFilter}
                                onChange={(e) => setCaseIdFilter(e.target.value)}
                                className='filter-input'
                            />
                            <input
                                type="text"
                                placeholder="Trip ID"
                                value={tripIdFilter}
                                onChange={(e) => setTripIdFilter(e.target.value)}
                                className='filter-input'
                            />
                        </div>
                        <div className="filter-row">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className='filter-input'
                            />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className='filter-input'
                            />
                            <select
                                className="list-dropdown"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">Case Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                            <select
                                className="list-dropdown"
                                value={actionFilter}
                                onChange={(e) => setActionFilter(e.target.value)}
                            >
                                <option value="">Follow-Up Action</option>
                                <option value="WARNING">Warning</option>
                                <option value="SUSPENSION">Suspension</option>
                                <option value="BAN">Ban</option>
                            </select>
                            <button className="sort-btn">Sort Latest</button>
                        </div>
                        <div className="filter-row align-middle">
                            <button className="clear-btn" onClick={clearFilters}>
                                CLEAR FILTER
                            </button>

                            <label className="switch-label">
                                <span style={{ marginRight: '8px' }}>List Repeated Offenders</span>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={repeatOffenderOnly}
                                        onChange={(e) => setRepeatOffenderOnly(e.target.checked)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Case Table */}
            <div className="case-table">
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Driver Name</th>
                            <th>Contact</th>
                            <th>Driver ID</th>
                            <th>Trip ID</th>
                            <th>Effect Date</th>
                            <th>Fllw-Up Action</th>
                            <th>Case Status</th>
                            <th className=''><a href='/addcase' className='add-icon'>+</a></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCases.map((item, index) => (
                            <tr key={index}
                                onClick={() => handleRowClick(item.id)}
                                className="clickable-row">
                                <td>{item.id}</td>
                                {/* <td className="highlight-text">{item.name}</td> */}
                                {/* <td><Link to={`/record/${item.driverId}`} className="name-link highlight-text">{item.name}</Link></td> */}
                                <td className="name-link highlight-text">{item.name}</td>
                                <td>{item.contact}</td>
                                <td>{item.driverId}</td>
                                <td>{item.tripId}</td>
                                <td>{item.effectDate}</td>
                                <td className="red-text bold-text">{item.action}</td>
                                <td className='bold-text'>{item.status}</td>
                                <td><FiEdit2 className="edit-icon" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="pagination">
                    <span
                        className={`page-nav ${currentPage === 1 ? 'page-disabled' : ''}`}
                        onClick={() => goToPage(currentPage - 1)}
                    >
                        ‹ Previous
                    </span>

                    {/* First Page */}
                    <span
                        className={`page-number ${currentPage === 1 ? 'page-current' : ''}`}
                        onClick={() => goToPage(1)}
                    >
                        1
                    </span>

                    {/* Ellipsis before middle pages */}
                    {currentPage > 3 && <span className="ellipsis">...</span>}

                    {/* Middle pages (current - 1, current, current + 1) */}
                    {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                        .filter(p => p > 1 && p < totalPages)
                        .map(p => (
                            <span
                                key={p}
                                className={`page-number ${currentPage === p ? 'page-current' : ''}`}
                                onClick={() => goToPage(p)}
                            >
                                {p}
                            </span>
                        ))}

                    {/* Ellipsis after middle pages */}
                    {currentPage < totalPages - 2 && <span className="ellipsis">...</span>}

                    {/* Last Page */}
                    {totalPages > 1 && (
                        <span
                            className={`page-number ${currentPage === totalPages ? 'page-current' : ''}`}
                            onClick={() => goToPage(totalPages)}
                        >
                            {totalPages}
                        </span>
                    )}

                    <span
                        className={`page-nav ${currentPage === totalPages ? 'page-disabled' : ''}`}
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        Next ›
                    </span>
                </div>

            </div>
        </div>
    );
}
