// components/UploadData.jsx
import  { useState } from "react";
import {
  FiUploadCloud,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import HistoricalData from "./HistoricalData";
import MappingData from "./MappingData";

const UploadData = ({
  activeTab,
  setActiveTab,
  tabs
}) => {
  // Sales upload state
  const [salesFile, setSalesFile] = useState(null);
  const [isSalesDragging, setIsSalesDragging] = useState(false);
  const [salesUploadStatus, setSalesUploadStatus] = useState(null); // 'success', 'error', null

  // Menu upload state
  const [menuFile, setMenuFile] = useState(null);
  const [isMenuDragging, setIsMenuDragging] = useState(false);
  const [menuUploadStatus, setMenuUploadStatus] = useState(null); // 'success', 'error', null

  // Sales handlers
  const handleSalesFileDrop = (e) => {
    e.preventDefault();
    setIsSalesDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetSalesFile(file);
    }
  };

  const handleSalesFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetSalesFile(file);
    }
  };

  const validateAndSetSalesFile = (file) => {
    // Validate file type
    const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx)$/i)) {
      alert('Please upload a CSV or XLSX file');
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert('File size exceeds 20MB limit');
      return;
    }

    setSalesFile(file);
    setSalesUploadStatus(null);
    console.log("Sales file uploaded:", file.name);
  };

  const handleSalesDragOver = (e) => {
    e.preventDefault();
    setIsSalesDragging(true);
  };

  const handleSalesDragLeave = (e) => {
    e.preventDefault();
    setIsSalesDragging(false);
  };

  const handleSalesConfirm = () => {
    if (!salesFile) {
      alert('Please select a file first');
      return;
    }
    
    // Simulate upload process
    setSalesUploadStatus('loading');
    console.log("Sales upload confirmed");
    
    // Simulate API call
    setTimeout(() => {
      setSalesUploadStatus('success');
      alert("Sales file uploaded successfully!");
      // Reset after 3 seconds
      setTimeout(() => {
        setSalesUploadStatus(null);
      }, 3000);
    }, 1500);
  };

  const handleSalesDiscard = () => {
    setSalesFile(null);
    setSalesUploadStatus(null);
    console.log("Sales upload discarded");
  };

  const handleSalesFixIssue = (row) => {
    console.log(`Fixing sales issue at row ${row}`);
    alert(`Fixing issue at row ${row}...`);
  };

  // Menu handlers
  const handleMenuFileDrop = (e) => {
    e.preventDefault();
    setIsMenuDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetMenuFile(file);
    }
  };

  const handleMenuFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetMenuFile(file);
    }
  };

  const validateAndSetMenuFile = (file) => {
    // Validate file type
    const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx)$/i)) {
      alert('Please upload a CSV or XLSX file');
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert('File size exceeds 20MB limit');
      return;
    }

    setMenuFile(file);
    setMenuUploadStatus(null);
    console.log("Menu file uploaded:", file.name);
  };

  const handleMenuDragOver = (e) => {
    e.preventDefault();
    setIsMenuDragging(true);
  };

  const handleMenuDragLeave = (e) => {
    e.preventDefault();
    setIsMenuDragging(false);
  };

  const handleMenuConfirm = () => {
    if (!menuFile) {
      alert('Please select a file first');
      return;
    }
    
    // Simulate upload process
    setMenuUploadStatus('loading');
    console.log("Menu upload confirmed");
    
    // Simulate API call
    setTimeout(() => {
      setMenuUploadStatus('success');
      alert("Menu file uploaded successfully!");
      setTimeout(() => {
        setMenuUploadStatus(null);
      }, 3000);
    }, 1500);
  };

  const handleMenuDiscard = () => {
    setMenuFile(null);
    setMenuUploadStatus(null);
    console.log("Menu upload discarded");
  };

  // Sample preview data (always shown)
  const salesPreviewData = {
    totalRecords: 156,
    validRecords: 152,
    invalidRecords: 4,
    systemMatch: "98%",
    issues: [
      { row: 42, message: "Invalid Date Format" },
      { row: 89, message: "Missing Transaction ID" },
      { row: 112, message: "Category 'Beverage' mismatch" }
    ]
  };

  const menuPreviewData = {
    totalItems: 42,
    mappedItems: 38,
    unmappedItems: 4,
    issues: [
      { item: " Sisig", message: "Missing ingredient mapping" },
      { item: "Chicken Poppers", message: "Duplicate entry" },
      { item: "Tapsilog", message: "Category has no items" }
    ]
  };

  return (
    <div className="tabbed-container">
      {/* Tabs Header */}
      <div className="tabs-header1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Sales Data Upload */}
      {activeTab === "upload" && (
        <div className="tab-content">
          <div className="upload-row">
            {/* First Upload Section - Sales Data */}
            <div className="upload">
              <div className="upload-header">
                <div>
                  <h2 className="upload-title">Upload New Sales Data</h2>
                  <p className="upload-subtitle">
                    Drag and drop your sales export below.
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div
                className={`drop-zone ${isSalesDragging ? "dragging" : ""} ${salesFile ? "uploaded" : ""}`}
                onDrop={handleSalesFileDrop}
                onDragOver={handleSalesDragOver}
                onDragLeave={handleSalesDragLeave}
                onClick={() => document.getElementById("salesFileInput").click()}
              >
                <div className="drop-zone-icon">
                  <FiUploadCloud size={32} />
                </div>
                {salesFile ? (
                  <div className="uploaded-file-info">
                    <p className="file-name">{salesFile.name}</p>
                    <p className="file-size">
                      {(salesFile.size / 1024).toFixed(2)} KB
                    </p>
                    <button
                      className="remove-file"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSalesDiscard();
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
                  id="salesFileInput"
                  className="file-input"
                  accept=".csv,.xlsx"
                  onChange={handleSalesFileSelect}
                />
              </div>

              {/* Upload Status */}
              {salesUploadStatus === 'loading' && (
                <div className="upload-status loading">
                  <span className="spinner"></span>
                  Uploading...
                </div>
              )}
              {salesUploadStatus === 'success' && (
                <div className="upload-status success">
                  <FiCheckCircle size={20} />
                  Upload successful!
                </div>
              )}

              {/* Data Preview for Sales - Always shown */}
              <div className="data-preview">
                <div className="preview-header">
                  <h3 className="preview-title">Preview & Validation</h3>
                  <div className="preview-status">
                    <span className={`status-badge ${salesFile ? "success" : "warning"}`}>
                      <span className="status-dot"></span>
                      {salesFile ? "File ready" : "Sample Preview"}
                    </span>
                    <span className="status-separator">|</span>
                    <span className="status-records">
                      {salesPreviewData.totalRecords} records found
                    </span>
                  </div>
                </div>

                <div className="preview-stats">
                  <div className="stat-box">
                    <p className="stat-label">Valid Records</p>
                    <p className="stat-value success">{salesPreviewData.validRecords}</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">Invalid Records</p>
                    <p className="stat-value error">{salesPreviewData.invalidRecords}</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">System Match</p>
                    <p className="stat-value">{salesPreviewData.systemMatch}</p>
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
                    {salesPreviewData.issues.map((issue, index) => (
                      <div className="issue-item" key={index}>
                        <span className="issue-text">
                          Row {issue.row}: {issue.message}
                        </span>
                        <button
                          className="issue-fix-btn"
                          onClick={() => handleSalesFixIssue(issue.row)}
                        >
                          Fix now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <div className="buttonsact">
                    <button 
                      className="btn-secondary" 
                      onClick={handleSalesDiscard}
                      disabled={!salesFile || salesUploadStatus === 'loading'}
                    >
                      Discard
                    </button>
                    <button
                      className={`btn-primary ${salesUploadStatus === 'loading' ? 'loading' : ''}`}
                      onClick={handleSalesConfirm}
                      disabled={!salesFile || salesUploadStatus === 'loading'}
                    >
                      {salesUploadStatus === 'loading' ? 'Uploading...' : 'Confirm & Process Upload'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Upload Section - Menu Data */}
            <div className="upload">
              <div className="upload-header">
                <div>
                  <h2 className="upload-title">Upload Menu Data</h2>
                  <p className="upload-subtitle">
                    Drag and drop your menu mapping file below.
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div
                className={`drop-zone ${isMenuDragging ? "dragging" : ""} ${menuFile ? "uploaded" : ""}`}
                onDrop={handleMenuFileDrop}
                onDragOver={handleMenuDragOver}
                onDragLeave={handleMenuDragLeave}
                onClick={() => document.getElementById("menuFileInput").click()}
              >
                <div className="drop-zone-icon">
                  <FiUploadCloud size={32} />
                </div>
                {menuFile ? (
                  <div className="uploaded-file-info">
                    <p className="file-name">{menuFile.name}</p>
                    <p className="file-size">
                      {(menuFile.size / 1024).toFixed(2)} KB
                    </p>
                    <button
                      className="remove-file"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuDiscard();
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
                  id="menuFileInput"
                  className="file-input"
                  accept=".csv,.xlsx"
                  onChange={handleMenuFileSelect}
                />
              </div>

              {/* Upload Status */}
              {menuUploadStatus === 'loading' && (
                <div className="upload-status loading">
                  <span className="spinner"></span>
                  Uploading...
                </div>
              )}
              {menuUploadStatus === 'success' && (
                <div className="upload-status success">
                  <FiCheckCircle size={20} />
                  Upload successful!
                </div>
              )}

              {/* Data Preview for Menu - Always shown */}
              <div className="data-preview">
                <div className="preview-header">
                  <h3 className="preview-title">Menu Preview & Validation</h3>
                  <div className="preview-status">
                    <span className={`status-badge ${menuFile ? "success" : "warning"}`}>
                      <span className="status-dot"></span>
                      {menuFile ? "File ready" : "Sample Preview"}
                    </span>
                    <span className="status-separator">|</span>
                    <span className="status-records">
                      {menuPreviewData.totalItems} items found
                    </span>
                  </div>
                </div>

                <div className="preview-stats">
                  <div className="stat-box">
                    <p className="stat-label">Menu Items</p>
                    <p className="stat-value success">{menuPreviewData.totalItems}</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">Mapped Items</p>
                    <p className="stat-value">{menuPreviewData.mappedItems}</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">Unmapped</p>
                    <p className="stat-value error">{menuPreviewData.unmappedItems}</p>
                  </div>
                </div>

                {/* Menu Validation Issues */}
                <div className="validation-issues">
                  <div className="issues-header">
                    <FiAlertCircle size={16} className="issues-icon" />
                    <p className="issues-title">
                      Mapping Issues Found
                    </p>
                  </div>
                  <div className="issues-list">
                    {menuPreviewData.issues.map((issue, index) => (
                      <div className="issue-item" key={index}>
                        <span className="issue-text">
                          Item '{issue.item}': {issue.message}
                        </span>
                        <button className="issue-fix-btn">
                          Fix now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <div className="buttonsact">
                    <button 
                      className="btn-secondary" 
                      onClick={handleMenuDiscard}
                      disabled={!menuFile || menuUploadStatus === 'loading'}
                    >
                      Discard
                    </button>
                    <button
                      className={`btn-primary ${menuUploadStatus === 'loading' ? 'loading' : ''}`}
                      onClick={handleMenuConfirm}
                      disabled={!menuFile || menuUploadStatus === 'loading'}
                    >
                      {menuUploadStatus === 'loading' ? 'Uploading...' : 'Process Menu Data'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historical Data Tab */}
      {activeTab === "historical" && (
        <div className="tab-content">
          <HistoricalData />
        </div>
      )}

      {/* Menu & Ingredient Mapping Tab */}
      {activeTab === "mapping" && (
        <div className="tab-content">
          <MappingData />
        </div>
      )}
    </div>
  );
};

export default UploadData;