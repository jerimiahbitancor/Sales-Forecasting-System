// DataManagement.jsx
import React, { useState } from "react";
import {
  FiUploadCloud,
  FiDownload,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiTrash2,
  FiTrendingUp,
  FiFolder,
  FiBarChart2,
  FiSettings,
  FiBell,
  FiInfo,
  FiChevronDown,
  FiGrid,
} from "react-icons/fi";
import "./DataManagement.css";
import Navbar from "../../Navbar/Navbar";

const DataManagement = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("File uploaded:", file.name);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleConfirmUpload = () => {
    console.log("Upload confirmed");
    alert("File uploaded successfully!");
  };

  const handleDiscard = () => {
    setUploadedFile(null);
    console.log("Upload discarded");
  };

  const handleFixIssue = (row) => {
    console.log(`Fixing issue at row ${row}`);
  };

  return (
    <div className="data-management-wrapper">
      <Navbar />

      {/* Main Content */}
      <main className="data-management-main">
        <div className="data-management-header">
          <div>
            <h1 className="page-title">Data Management</h1>
            <p className="page-subtitle">
              Upload, manage, and review your sales and mapping datasets.
            </p>
          </div>
        </div>

        <div className="content-grid">
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-card-content">
                <p className="summary-label">Sales Records</p>
                <p className="summary-value">12,450</p>
                <p className="summary-subtext">Total Active</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-card-content">
                <p className="summary-label">Menu Items</p>
                <p className="summary-value">142</p>
                <p className="summary-subtext">Mapped Items</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-card-content">
                <p className="summary-label">Last Sync</p>
                <p className="summary-value">2h ago</p>
                <p className="summary-subtext">June 20, 2025</p>
              </div>
            </div>
          </div>

          {/* Tabbed Container */}
          <div className="tabbed-container">
            {/* Tabs Header */}
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === "upload" ? "active" : ""}`}
                onClick={() => setActiveTab("upload")}
              >
                Sales Data Upload
              </button>
              <button
                className={`tab-btn ${activeTab === "historical" ? "active" : ""}`}
                onClick={() => setActiveTab("historical")}
              >
                Historical Data Storage
              </button>
              <button
                className={`tab-btn ${activeTab === "mapping" ? "active" : ""}`}
                onClick={() => setActiveTab("mapping")}
              >
                Menu & Ingredient Mapping
              </button>
            </div>

            {/* Tab Content: Sales Data Upload */}
            {activeTab === "upload" && (
              <div className="tab-content">
                <div className="upload-container">
                  <div className="upload-header">
                    <div>
                      <h2 className="upload-title">Upload New Sales Data</h2>
                      <p className="upload-subtitle">
                        Drag and drop your daily sales export below.
                      </p>
                    </div>
                    <button className="download-template-btn">
                      <FiDownload size={16} />
                      Download Template
                    </button>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div
                    className={`drop-zone ${isDragging ? "dragging" : ""} ${uploadedFile ? "uploaded" : ""}`}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <div className="drop-zone-icon">
                      <FiUploadCloud size={32} />
                    </div>
                    {uploadedFile ? (
                      <div className="uploaded-file-info">
                        <p className="file-name">{uploadedFile.name}</p>
                        <p className="file-size">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                        <button
                          className="remove-file"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="drop-zone-text">
                          Drag and Drop Files or{" "}
                          <span className="browse-link">Browse</span>
                        </p>
                        <p className="drop-zone-formats">
                          Supported formats: CSV, .XLSX (Max 20MB)
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      id="fileInput"
                      className="file-input"
                      accept=".csv,.xlsx"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {/* Data Preview */}
                  <div className="data-preview">
                    <div className="preview-header">
                      <h3 className="preview-title">Preview & Validation</h3>
                      <div className="preview-status">
                        <span className="status-badge success">
                          <span className="status-dot"></span>
                          File ready
                        </span>
                        <span className="status-separator">|</span>
                        <span className="status-records">
                          156 records found
                        </span>
                      </div>
                    </div>

                    <div className="preview-stats">
                      <div className="stat-box">
                        <p className="stat-label">Valid Records</p>
                        <p className="stat-value success">152</p>
                      </div>
                      <div className="stat-box">
                        <p className="stat-label">Invalid Records</p>
                        <p className="stat-value error">4</p>
                      </div>
                      <div className="stat-box">
                        <p className="stat-label">System Match</p>
                        <p className="stat-value">98%</p>
                      </div>
                    </div>

                    {/* Validation Issues */}
                    <div className="validation-issues">
                      <div className="issues-header">
                        <FiAlertCircle size={16} className="issues-icon" />
                        <p className="issues-title">
                          Validation Issues Identified
                        </p>
                      </div>
                      <div className="issues-list">
                        <div className="issue-item">
                          <span className="issue-text">
                            Row 42: Invalid Date Format
                          </span>
                          <button
                            className="issue-fix-btn"
                            onClick={() => handleFixIssue(42)}
                          >
                            Fix now
                          </button>
                        </div>
                        <div className="issue-item">
                          <span className="issue-text">
                            Row 89: Missing Transaction ID
                          </span>
                          <button
                            className="issue-fix-btn"
                            onClick={() => handleFixIssue(89)}
                          >
                            Fix now
                          </button>
                        </div>
                        <div className="issue-item">
                          <span className="issue-text">
                            Row 112: Category 'Beverage' mismatch
                          </span>
                          <button
                            className="issue-fix-btn"
                            onClick={() => handleFixIssue(112)}
                          >
                            Fix now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                      <div className="buttonsact">
                         <button className="btn-secondary" onClick={handleDiscard}>
                        Discard
                      </button>
                        <button
                          className="btn-primary"
                          onClick={handleConfirmUpload}
                        >
                          Confirm & Process Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataManagement;
