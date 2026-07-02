// DataManagement.jsx
import { useState } from "react";
import {
  
} from "react-icons/fi";
import "./DataManagement.css";
import Navbar from "../../components/Navbar/Navbar";
import UploadData from "../components/UploadData";

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

  // Define tabs configuration
  const tabs = [
    { id: "upload", label: "Sales Data Upload" },
    { id: "mapping", label: "Menu & Ingredient Mapping" },
        { id: "historical", label: "Historical Data Storage" },

  ];

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
                <p className="summary-val">12,450</p>
                <p className="summary-subtext">Total Active</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-card-content">
                <p className="summary-label">Menu Items</p>
                <p className="summary-val">142</p>
                <p className="summary-subtext">Mapped Items</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-card-content">
                <p className="summary-label">Last Sync</p>
                <p className="summary-val">2h ago</p>
                <p className="summary-subtext">June 20, 2025</p>
              </div>
            </div>
          </div>

          {/* Tabbed Container */}
          <UploadData  
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            tabs={tabs}
            uploadedFile={uploadedFile}
            isDragging={isDragging}
            handleFileDrop={handleFileDrop}
            handleFileSelect={handleFileSelect}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleConfirmUpload={handleConfirmUpload}
            handleDiscard={handleDiscard}
            handleFixIssue={handleFixIssue}
          />
        </div>
      </main>
    </div>
  );
};

export default DataManagement;