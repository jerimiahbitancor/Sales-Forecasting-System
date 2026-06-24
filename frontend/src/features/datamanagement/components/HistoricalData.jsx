// components/HistoricalData.jsx
import React, { useState } from "react";
import { 
  FiSearch, 
  FiChevronLeft, 
  FiChevronRight, 
  FiDownload,
  FiPlus
} from "react-icons/fi";
import "./HistoricalData.css";

const HistoricalData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample historical data
  const [historicalData] = useState([
    { id: 1, uploadDate: "2025-06-20 14:30", fileName: "Data_File.xlsx", records: 245 },
    { id: 2, uploadDate: "2025-06-20 11:15", fileName: ".csv", records: 189 },
    { id: 3, uploadDate: "2025-06-19 16:45", fileName: ".xlsx", records: 156 },
    { id: 4, uploadDate: "2025-06-19 09:20", fileName: ".csv", records: 210 },
    { id: 5, uploadDate: "2025-06-18 13:50", fileName: ".xlsx", records: 98 },
    { id: 6, uploadDate: "2025-06-18 10:30", fileName: ".csv", records: 167 },
    { id: 7, uploadDate: "2025-06-17 15:20", fileName: ".xlsx", records: 134 },
    { id: 8, uploadDate: "2025-06-17 08:45", fileName: ".csv", records: 223 },
    { id: 9, uploadDate: "2025-06-16 14:10", fileName: ".xlsx", records: 189 },
    { id: 10, uploadDate: "2025-06-16 09:30", fileName: ".csv", records: 145 },
    { id: 11, uploadDate: "2025-06-15 16:40", fileName: ".xlsx", records: 176 },
    { id: 12, uploadDate: "2025-06-15 11:25", fileName: ".csv", records: 198 },
  ]);

  // Filter data based on search
  const filteredData = historicalData.filter(item =>
    item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.uploadDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="historical-container">
      {/* Header */}
      <div className="historical-header">
        <h2 className="historical-title">Historical Data Storage</h2>
        <button className="btn-upload">
          <FiPlus size={16} /> Upload New Data
        </button>
      </div>

      {/* Search and Filter */}
      <div className="historical-controls">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search product or ingredient..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-wrapper">
          <label>Sort By:</label>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>File Name: A-Z</option>
            <option>File Name: Z-A</option>
            <option>Records: Low to High</option>
            <option>Records: High to Low</option>
          </select>
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="historical-section">
        <div className="historical-table-wrapper">
          <table className="historical-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Upload Date</th>
                <th>File Name</th>
                <th>Records</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.uploadDate}</td>
                  <td>{item.fileName}</td>
                  <td>{item.records.toLocaleString()}</td>
                  <td>
                    <button className="action-btn download">
                      <FiDownload size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-left">
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft size={16} /> Previous
            </button>
          </div>
          <div className="pagination-center">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`page-number ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
          </div>
          <div className="pagination-right">
            <button 
              className="page-btn"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;