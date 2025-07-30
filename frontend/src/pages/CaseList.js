import React, { useState, useEffect } from 'react';
import '../styles.css';
import { FiFilter, FiEdit2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 5;

  const [filterType, setFilterType] = useState("ALL");
  const [searchName, setSearchName] = useState('');
  const [driverIdFilter, setDriverIdFilter] = useState('');
  const [caseIdFilter, setCaseIdFilter] = useState('');
  const [tripIdFilter, setTripIdFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [hideRepeated, setHideRepeated] = useState(false);
  const [sortLatest, setSortLatest] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cases');
        setCases(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load case data.");
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
    setDriverIdFilter('');
    setCaseIdFilter('');
    setTripIdFilter('');
    setFromDate('');
    setToDate('');
    setStatusFilter('');
    setActionFilter('');
    setHideRepeated(false);
  };

  const parseDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const filteredCases = cases.filter((item) => {
    const effectDate = parseDate(item.compliance?.suspensionStartDate);

    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesName = item.fullName?.toLowerCase().includes(searchName.toLowerCase());
    const matchesDriverId = item.userId?.includes(driverIdFilter);
    const matchesCaseId = item.caseId?.includes(caseIdFilter);
    const matchesTripId = item.tripId?.includes(tripIdFilter);
    const matchesStatus = statusFilter === '' || item.status === statusFilter;
    const matchesAction = actionFilter === '' || item.verdict === actionFilter;
    const matchesFromDate = !fromDate || (effectDate && effectDate >= new Date(fromDate));
    const matchesToDate = !toDate || (effectDate && effectDate <= new Date(toDate));

    return (
      matchesType &&
      matchesName &&
      matchesDriverId &&
      matchesCaseId &&
      matchesTripId &&
      matchesStatus &&
      matchesAction &&
      matchesFromDate &&
      matchesToDate
    );
  });

  const getMostRecentCasesByDriver = (cases) => {
    const grouped = {};
    cases.forEach((c) => {
      const current = grouped[c.userId];
      const currentDate = current ? parseDate(current.compliance?.suspensionStartDate) : null;
      const cDate = parseDate(c.compliance?.suspensionStartDate);
      if (!current || (cDate && currentDate && cDate > currentDate)) {
        grouped[c.userId] = c;
      }
    });
    return Object.values(grouped);
  };

  const filteredCasesAfterDistinct = hideRepeated
    ? getMostRecentCasesByDriver(filteredCases)
    : filteredCases;

  const sortedCases = sortLatest
    ? [...filteredCasesAfterDistinct].sort((a, b) => {
        const aDate = parseDate(a.compliance?.suspensionStartDate);
        const bDate = parseDate(b.compliance?.suspensionStartDate);
        return bDate - aDate;
      })
    : filteredCasesAfterDistinct;

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = sortedCases.slice(indexOfFirstCase, indexOfLastCase);
  const totalPages = Math.ceil(filteredCasesAfterDistinct.length / casesPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const typeCounts = {
    "Ride-Hailing": cases.filter(c => c.type === "Ride-Hailing").length,
    "Delivery": cases.filter(c => c.type === "Delivery").length,
    "Accident": cases.filter(c => c.type === "Accident").length
  };

  if (loading) return <div className="loader">Loading cases...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="case-list-container">
      {/* Tabs */}
      <div className="case-tabs">
        {["ALL", "Ride-Hailing", "Delivery", "Accident"].map((type) => (
          <button
            key={type}
            className={`tab ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type.toUpperCase()} {type !== "ALL" && `(${typeCounts[type] || 0})`}
          </button>
        ))}
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => setShowFilters(!showFilters)}>
          <FiFilter />
          <span>Filters</span>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {showFilters && (
          <div className="filters">
            <div className="search-container">
              <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
              <input
                type="text"
                placeholder="Search Driver Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="filter-row">
              <input className='filter-input' placeholder="Driver ID" value={driverIdFilter} onChange={e => setDriverIdFilter(e.target.value)} />
              <input className='filter-input' placeholder="Case ID" value={caseIdFilter} onChange={e => setCaseIdFilter(e.target.value)} />
              <input className='filter-input' placeholder="Trip ID" value={tripIdFilter} onChange={e => setTripIdFilter(e.target.value)} />
            </div>
            <div className="filter-row">
              <input type="date" className='filter-input' value={fromDate} onChange={e => setFromDate(e.target.value)} />
              <input type="date" className='filter-input' value={toDate} onChange={e => setToDate(e.target.value)} />
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
                <span style={{ marginRight: '8px' }}>Hide Repeated Offenders</span>
                <label className="switch">
                  <input type="checkbox" checked={hideRepeated} onChange={(e) => setHideRepeated(e.target.checked)} />
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
              <th><a href='/addcase' className='add-icon'>+</a></th>
            </tr>
          </thead>
          <tbody>
            {currentCases.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>No cases found.</td>
              </tr>
            ) : currentCases.map((item, index) => (
              <tr key={item._id || index} onClick={() => handleRowClick(item._id)} className="clickable-row">
                <td>{indexOfFirstCase + index + 1}</td>
                <td className="name-link highlight-text">{item.fullName}</td>
                <td>{item.contact}</td>
                <td>{item.userId}</td>
                <td>{item.tripId}</td>
                <td>{item.compliance?.suspensionStartDate?.split('T')[0]}</td>
                <td className="red-text bold-text">{item.verdict}</td>
                <td className='bold-text'>{item.status}</td>
                <td><FiEdit2 className="edit-icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <span className={`page-nav ${currentPage === 1 ? 'page-disabled' : ''}`} onClick={() => goToPage(currentPage - 1)}>‹ Previous</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              className={`page-number ${currentPage === i + 1 ? 'page-current' : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span className={`page-nav ${currentPage === totalPages ? 'page-disabled' : ''}`} onClick={() => goToPage(currentPage + 1)}>Next ›</span>
        </div>
      </div>
    </div>
  );
}
