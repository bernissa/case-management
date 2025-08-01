import React, { useState, useEffect } from 'react';
import '../styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import the xlsx library
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import binIcon from '../assets/bin-icon.svg';

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 5;
  const [showFilters, setShowFilters] = useState(true);
  const [filterType, setFilterType] = useState('ALL');

  const [searchName, setSearchName] = useState('');
  const [userIdFilter, setUserIdFilter] = useState('');
  const [caseIdFilter, setCaseIdFilter] = useState('');
  const [tripIdFilter, setTripIdFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [showRepeatedOnly, setShowRepeatedOnly] = useState(false);
  const [sortLatest, setSortLatest] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this case?');
    if (!confirm) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/cases/${id}`);
      alert('Case deleted!');
      // Optionally refresh the list
      setCases(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to delete case:', err);
      alert('Something went wrong.');
    }
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/cases`);
        setCases(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cases');
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/cases/${id}`);
  };

  const clearFilters = () => {
    setSearchName('');
    setUserIdFilter('');
    setCaseIdFilter('');
    setTripIdFilter('');
    setFromDate('');
    setToDate('');
    setStatusFilter('');
    setActionFilter('');
    setShowRepeatedOnly(false);
  };

  const parseDate = (dateStr) => new Date(dateStr);

  const filteredCases = cases.filter((item) => {
    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesName = item.name?.toLowerCase().includes(searchName.toLowerCase());
    const matchesUserId = item.userId?.includes(userIdFilter);
    const matchesCaseId = item._id?.includes(caseIdFilter);
    const matchesTripId = item.tripId?.includes(tripIdFilter);
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesAction = !actionFilter || item.action === actionFilter;
    const effectDate = parseDate(item.effectDate);
    const matchesFromDate = !fromDate || effectDate >= new Date(fromDate);
    const matchesToDate = !toDate || effectDate <= new Date(toDate);

    return (
      matchesType &&
      matchesName &&
      matchesUserId &&
      matchesCaseId &&
      matchesTripId &&
      matchesStatus &&
      matchesAction &&
      matchesFromDate &&
      matchesToDate
    );
  });

  const parseCustomDate = (str) => {
    if (!str || !str.includes('/')) return new Date(str);
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const showLatestOfRepeatedOffenders = (cases) => {
    const grouped = {};
    const counts = {};

    cases.forEach((c) => {
      const userId = c.userId;
      const rawDate = c.customerService?.incidentDate || c.effectDate;
      const parsed = parseCustomDate(rawDate);
      counts[userId] = (counts[userId] || 0) + 1;

      const existing = grouped[userId];
      const existingDate = existing ? parseCustomDate(existing.customerService?.incidentDate || existing.effectDate) : null;

      if (!existing || parsed > existingDate) {
        grouped[userId] = c;
      }
    });

    return Object.entries(counts)
      .filter(([_, count]) => count > 1)
      .map(([userId]) => grouped[userId]);
  };

  const filteredCasesAfterToggle = showRepeatedOnly
    ? showLatestOfRepeatedOffenders(filteredCases)
    : filteredCases;

  const sortedCases = sortLatest
    ? [...filteredCasesAfterToggle].sort((a, b) => {
      const dateA = parseCustomDate(a.customerService?.incidentDate || a.effectDate);
      const dateB = parseCustomDate(b.customerService?.incidentDate || b.effectDate);
      return dateB - dateA;
    })
    : filteredCasesAfterToggle;

  const totalCases = sortedCases.length;
  const totalPages = Math.ceil(totalCases / casesPerPage);
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = sortedCases.slice(indexOfFirstCase, indexOfLastCase);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterType,
    searchName,
    userIdFilter,
    caseIdFilter,
    tripIdFilter,
    fromDate,
    toDate,
    statusFilter,
    actionFilter,
    showRepeatedOnly,
  ]);

  if (loading) return <div className="loader">Loading cases...</div>;
  if (error) return <div className="error">{error}</div>;

  // Export to Excel Function
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const exportData = sortedCases.map((item) => {
      return {
        'Case ID': item._id,
        'User Name': item.name,
        'User ID': item.userId,
        'Contact': item.contact,
        'Email': item.email,
        'Trip ID': item.tripId,
        'Violation / Issue': item.violation,
        'Status': item.status,
        'Follow-Up Action': item.action,
        'Duration': item.duration,
        'Remarks': item.remarks,
        'Customer Type': item.customerService.userType,
        'Fleet Type': item.customerService.fleetType,
        'Transaction ID': item.customerService.transactionId,
        'Service Type': item.customerService.serviceType,
        'Type of Issue': item.customerService.typeOfIssue,
        'Incident Date': item.customerService.incidentDate,
        'Start Time': item.customerService.startTime,
        'End Time': item.customerService.endTime,
        'Ticket Created On': item.customerService.ticketDate,
        'Resolved By': item.customerService.resolvedBy,
        'Resolved Date': item.customerService.resolvedDate,
        'Input By': item.compliance.inputBy,
        'Verdict By': item.compliance.verdictBy,
        'Suspension Start Date': item.compliance.suspensionStartDate,
        'Suspension End Date': item.compliance.suspensionEndDate,
        'Reinstated By': item.compliance.reinstatedBy,
        'Staff Handling Case': item.compliance.handler,
      };
    });
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Case Data');
    XLSX.writeFile(wb, 'CaseList.xlsx');
  };

  return (
    <div className="case-list-container">
      {/* Tabs */}
      <div className="case-tabs">
        {['ALL', 'Ride-Hailing', 'Delivery', 'Accident'].map((type) => (
          <button
            key={type}
            className={`tab ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type.toUpperCase()} ({cases.filter(c => type === 'ALL' || c.type === type).length})
          </button>
        ))}
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
            {/* Search and Filter Inputs */}
            <div className="search-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
              <input
                type="text"
                placeholder="Search User Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="filter-row">
              <input className="filter-input" placeholder="User ID" value={userIdFilter} onChange={(e) => setUserIdFilter(e.target.value)} />
              <input className="filter-input" placeholder="Case ID" value={caseIdFilter} onChange={(e) => setCaseIdFilter(e.target.value)} />
              <input className="filter-input" placeholder="Trip ID" value={tripIdFilter} onChange={(e) => setTripIdFilter(e.target.value)} />
            </div>
            <div className="filter-row">
              <input type="date" className="filter-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <input type="date" className="filter-input" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              <select className="list-dropdown" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Case Status</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
              </select>
              <select className="list-dropdown" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
                <option value="">Follow-Up Action</option>
                <option value="WARNING">Warning</option>
                <option value="SUSPENSION">Suspension</option>
                <option value="BAN">Ban</option>
              </select>
              <button className={`sort-btn ${sortLatest ? 'active-sort' : ''}`} onClick={() => setSortLatest(!sortLatest)}>
                Sort Latest {sortLatest ? '↓' : ''}
              </button>
            </div>
            <div className="filter-row align-middle">
              <button className="clear-btn" onClick={clearFilters}>CLEAR FILTER</button>
              <label className="switch-label">
                <span style={{ marginRight: '8px' }}>Show Only Repeated Offenders</span>
                <label className="switch">
                  <input type="checkbox" checked={showRepeatedOnly} onChange={(e) => setShowRepeatedOnly(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </label>
              {/* Export Button */}
              <button className="export-btn" onClick={exportToExcel}>Export to Excel</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="case-table">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>User Name</th>
              <th>Contact</th>
              <th>User ID</th>
              <th>Trip ID</th>
              <th>Effect Date</th>
              <th>Follow-Up Action</th>
              <th>Case Status</th>
              <th><a href="/addcase" className="add-icon">+</a></th>
            </tr>
          </thead>
          <tbody>
            {currentCases.length === 0 ? (
              <tr><td colSpan="9" style={{ textAlign: 'center' }}>No cases found.</td></tr>
            ) : currentCases.map((item, index) => (
              <tr key={item._id} onClick={() => handleRowClick(item._id)} className="clickable-row">
                <td>{indexOfFirstCase + index + 1}</td>
                <td className="name-link highlight-text">{item.name}</td>
                <td>{item.contact}</td>
                <td>{item.userId}</td>
                <td>{item.tripId}</td>
                <td>{item.effectDate}</td>
                <td className="red-text bold-text">{item.action}</td>
                <td className="bold-text">{item.status}</td>
                <td>
                  <img
                    src={binIcon}
                    alt="delete"
                    className="delete-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // prevents row click navigation
                      handleDelete(item._id);
                    }}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <span className={`page-nav ${currentPage === 1 ? 'page-disabled' : ''}`} onClick={() => goToPage(currentPage - 1)}>‹ Previous</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span key={i} className={`page-number ${currentPage === i + 1 ? 'page-current' : ''}`} onClick={() => goToPage(i + 1)}>{i + 1}</span>
          ))}
          <span className={`page-nav ${currentPage === totalPages ? 'page-disabled' : ''}`} onClick={() => goToPage(currentPage + 1)}>Next ›</span>
        </div>
      </div>
    </div>
  );
}
