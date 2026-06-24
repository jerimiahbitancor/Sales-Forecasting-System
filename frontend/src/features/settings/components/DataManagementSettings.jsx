
import { useState } from "react";
import { FiInfo, FiAlertTriangle, FiDownload } from "react-icons/fi";
import "./DataManagementSettings.css";

function DataManagementSettings() {
  const [exportFormat, setExportFormat] = useState("xlsx");
  const [backupStatus, setBackupStatus] = useState(null);
  const [resetStatus, setResetStatus] = useState(null);
  const [exportStatus, setExportStatus] = useState(null);

  // Backup Database handler
  const handleCreateBackup = () => {
    setBackupStatus("loading");
    console.log("Creating backup...");

    // Simulate API call
    setTimeout(() => {
      setBackupStatus("success");
      alert("Database backup created successfully!");
      setTimeout(() => {
        setBackupStatus(null);
      }, 3000);
    }, 2000);
  };

  // Reset Historical Data handler
  const handleResetHistoricalData = () => {
    const confirmed = window.confirm(
      "WARNING: This action cannot be undone. Are you sure you want to reset all historical data?"
    );
    if (!confirmed) return;

    setResetStatus("loading");
    console.log("Resetting historical data...");

    // Simulate API call
    setTimeout(() => {
      setResetStatus("success");
      alert("Historical data reset successfully!");
      setTimeout(() => {
        setResetStatus(null);
      }, 3000);
    }, 2000);
  };

  // Export Data handler
  const handleExportData = () => {
    setExportStatus("loading");
    console.log("Exporting data as:", exportFormat);

    // Simulate API call
    setTimeout(() => {
      setExportStatus("success");
      alert(`Data exported successfully as ${exportFormat.toUpperCase()}!`);
      setTimeout(() => {
        setExportStatus(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="data-management-settings-container">
      <div className="settings-panels-wrapper">
        {/* Left Panel */}
        <div className="left-panel">
          {/* Backup Database Section */}
          <div className="settings-section">
            <h3 className="section-title">Backup Database</h3>

            <div className="info-box">
              <div className="info-icon">
                <FiInfo size={20} />
              </div>
              <p className="info-text">
                Generate a backup file containing all current system records for recovery purposes.
              </p>
            </div>

            {backupStatus === "loading" && (
              <div className="status-message loading">
                <span className="spinner"></span>
                Creating backup...
              </div>
            )}
            {backupStatus === "success" && (
              <div className="status-message success">
                ✓ Backup created successfully!
              </div>
            )}

            <button className="btn-action btn-backup" onClick={handleCreateBackup}>
              CREATE BACKUP
            </button>
          </div>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Reset Historical Data Section */}
          <div className="settings-section">
            <h3 className="section-title">Reset Historical Data</h3>

            <div className="warning-box">
              <div className="warning-icon">
                <FiAlertTriangle size={20} />
              </div>
              <p className="warning-text">
                <strong>WARNING:</strong> This action cannot be undone.
              </p>
            </div>

            {resetStatus === "loading" && (
              <div className="status-message loading">
                <span className="spinner"></span>
                Resetting data...
              </div>
            )}
            {resetStatus === "success" && (
              <div className="status-message success">
                ✓ Data reset successfully!
              </div>
            )}

            <button className="btn-action btn-reset" onClick={handleResetHistoricalData}>
              RESET HISTORICAL DATA
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          {/* Export Data Section */}
          <div className="settings-section">
            <h3 className="section-title">Export All Data</h3>
            <p className="section-subtitle">Format:</p>

            {/* Format Selection */}
            <div className="format-options">
              <label className="radio-label">
                <input
                  type="radio"
                  name="exportFormat"
                  value="xlsx"
                  checked={exportFormat === "xlsx"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span className="radio-text">Excel (.xlsx)</span>
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="exportFormat"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span className="radio-text">CSV (.csv)</span>
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  name="exportFormat"
                  value="pdf"
                  checked={exportFormat === "pdf"}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                <span className="radio-text">PDF (.pdf)</span>
              </label>
            </div>

            {exportStatus === "loading" && (
              <div className="status-message loading">
                <span className="spinner"></span>
                Exporting data...
              </div>
            )}
            {exportStatus === "success" && (
              <div className="status-message success">
                ✓ Data exported successfully!
              </div>
            )}

            <button className="btn-action btn-export" onClick={handleExportData}>
              <FiDownload size={16} /> EXPORT DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataManagementSettings;