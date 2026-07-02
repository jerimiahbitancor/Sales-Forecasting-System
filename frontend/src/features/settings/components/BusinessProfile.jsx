// BusinessProfile.jsx
import { useState } from "react";
import { FiUploadCloud, FiCheckCircle, FiSave } from "react-icons/fi";
import "./BusinessProfile.css";

function BusinessProfile() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    businessEmail: "",
    businessContactNumber: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Upload handlers
  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetLogoFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      validateAndSetLogoFile(file);
    }
  };

  const validateAndSetLogoFile = (file) => {
    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/gif"];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(png|jpg|jpeg|gif)$/i)) {
      alert("Please upload a PNG, JPG, JPEG, or GIF image");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit");
      return;
    }

    setLogoFile(file);
    setUploadStatus(null);
    console.log("Logo file selected:", file.name);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setLogoFile(null);
    setUploadStatus(null);
  };

  // Save changes handler
  const handleSaveChanges = () => {
    console.log("Saving business profile:", formData, "Logo:", logoFile);
    setUploadStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setUploadStatus("success");
      alert("Business profile saved successfully!");
      setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="business-profile-container">
      <div className="content-wrapper">
        {/* Form Section */}
        <div className="form-section">
        {/* Business Name */}
        <div className="form-group">
          <label htmlFor="businessName" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            className="form-input"
            placeholder="Enter business name"
            value={formData.businessName}
            onChange={handleInputChange}
          />
        </div>

        {/* Business Address */}
        <div className="form-group">
          <label htmlFor="businessAddress" className="form-label">
            Business Address
          </label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            className="form-input"
            placeholder="Enter business address"
            value={formData.businessAddress}
            onChange={handleInputChange}
          />
        </div>

        {/* Business Email */}
        <div className="form-group">
          <label htmlFor="businessEmail" className="form-label">
            Business Email
          </label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            className="form-input"
            placeholder="Enter business email"
            value={formData.businessEmail}
            onChange={handleInputChange}
          />
        </div>

        {/* Business Contact Number */}
        <div className="form-group">
          <label htmlFor="businessContactNumber" className="form-label">
            Business Contact Number
          </label>
          <input
            type="tel"
            id="businessContactNumber"
            name="businessContactNumber"
            className="form-input"
            placeholder="Enter contact number"
            value={formData.businessContactNumber}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Upload Logo Section */}
      <div className="upload-section">
        <div className="upload-header">
          <h3 className="upload-title">Upload New Business Logo</h3>
        </div>

        {/* Drag and Drop Zone */}
        <div
          className={`drop-zone ${isDragging ? "dragging" : ""} ${logoFile ? "uploaded" : ""}`}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("logoFileInput").click()}
        >
          <div className="drop-zone-icon">
            <FiUploadCloud size={32} />
          </div>
          {logoFile ? (
            <div className="uploaded-file-info">
              <p className="file-name">{logoFile.name}</p>
              <p className="file-size">
                {(logoFile.size / 1024).toFixed(2)} KB
              </p>
              <button
                className="remove-file"
                onClick={handleRemoveFile}
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
              <p className="upload-subtitle">
                Supported formats: PNG, JPG, GIF (Max 5MB)
              </p>
            </>
          )}
          <input
            type="file"
            id="logoFileInput"
            className="file-input"
            accept=".png,.jpg,.jpeg,.gif"
            onChange={handleFileSelect}
          />
        </div>

        {/* Upload Status */}
        {uploadStatus === "loading" && (
          <div className="upload-status loading">
            <span className="spinner"></span>
            Uploading...
          </div>
        )}
        {uploadStatus === "success" && (
          <div className="upload-status success">
            <FiCheckCircle size={20} />
            Upload successful!
          </div>
        )}
      </div>
      </div>

      {/* Save Changes Button */}
      <div className="button-section">
        <button className="btn-save-changes" onClick={handleSaveChanges}>
          <FiSave size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}

export default BusinessProfile;