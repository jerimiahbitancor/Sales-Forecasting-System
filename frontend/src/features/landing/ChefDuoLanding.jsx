// ChefDuoLanding.jsx
import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./ChefDuoLanding.css";
import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";
// Import your images
import card1Img from "../../assets/landing/card1.png";
import card2Img from "../../assets/landing/card2.png";
import card3Img from "../../assets/landing/card3.png";

const ChefDuoLanding = () => {
  const dashboardRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const fileInputRef = useRef(null);

  const dashCard1Ref = useRef(null);
  const dashCard2Ref = useRef(null);
  const dashCard3Ref = useRef(null);
  const dashCard4Ref = useRef(null);

  const analyticsCard1Ref = useRef(null);
  const analyticsCard2Ref = useRef(null);
  const analyticsCard3Ref = useRef(null);
  const analyticsCard4Ref = useRef(null);

  // Parallax effect for dashboard and floating cards
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dashboardRef.current) return;

      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Main dashboard rotation
      const rotX = 8 + (mouseY - 0.5) * 4;
      const rotY = -8 + (mouseX - 0.5) * 4;
      dashboardRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;

      // Floating card 1 - moves more in X direction
      if (card1Ref.current) {
        const x1 = (mouseX - 0.5) * 60;
        const y1 = (mouseY - 0.5) * 30;
        card1Ref.current.style.transform = `translate(${x1}px, ${y1}px) rotate(${x1 * 0.1}deg)`;
      }

      // Floating card 2 - moves more in Y direction
      if (card2Ref.current) {
        const x2 = (mouseX - 0.5) * 60;
        const y2 = (mouseY - 0.5) * 30;
        card2Ref.current.style.transform = `translate(${x2}px, ${y2}px) rotate(${x2 * 0.1}deg)`;
      }

      // Floating card 3 - moves the most
      if (card3Ref.current) {
        const x3 = (mouseX - 0.5) * 60;
        const y3 = (mouseY - 0.5) * 30;
        card3Ref.current.style.transform = `translate(${x3}px, ${y3}px) rotate(${x3 * 0.1}deg)`;
      }

      if (dashCard1Ref.current) {
        const dx1 = (mouseX - 0.5) * 25;
        const dy1 = (mouseY - 0.5) * 20;
        dashCard1Ref.current.style.transform = `translate(${dx1}px, ${dy1}px)`;
      }

      if (dashCard2Ref.current) {
        const dx2 = (mouseX - 0.5) * 25;
        const dy2 = (mouseY - 0.5) * 20;
        dashCard2Ref.current.style.transform = `translate(${dx2}px, ${dy2}px)`;
      }

      if (dashCard3Ref.current) {
        const dx3 = (mouseX - 0.5) * 25;
        const dy3 = (mouseY - 0.5) * 20;
        dashCard3Ref.current.style.transform = `translate(${dx3}px, ${dy3}px)`;
      }

      if (dashCard4Ref.current) {
        const dx4 = (mouseX - 0.5) * 25;
        const dy4 = (mouseY - 0.5) * 20;
        dashCard4Ref.current.style.transform = `translate(${dx4}px, ${dy4}px)`;
      }
    

     if (analyticsCard1Ref.current) {
        const dx1 = (mouseX - 0.5) * 25;
        const dy1 = (mouseY - 0.5) * 20;
        analyticsCard1Ref.current.style.transform = `translate(${dx1}px, ${dy1}px)`;
      }

      if (analyticsCard2Ref.current) {
        const dx2 = (mouseX - 0.5) * 25;
        const dy2 = (mouseY - 0.5) * 20;
        analyticsCard2Ref.current.style.transform = `translate(${dx2}px, ${dy2}px)`;
      }

      if (analyticsCard3Ref.current) {
        const dx3 = (mouseX - 0.5) * 25;
        const dy3 = (mouseY - 0.5) * 20;
        analyticsCard3Ref.current.style.transform = `translate(${dx3}px, ${dy3}px)`;
      }

      if (analyticsCard4Ref.current) {
        const dx4 = (mouseX - 0.5) * 25;
        const dy4 = (mouseY - 0.5) * 20;
        analyticsCard4Ref.current.style.transform = `translate(${dx4}px, ${dy4}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // Handle your file upload logic here
      alert(`File "${file.name}" selected for upload!`);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="landing-container">
      <Navbar />
      <main className="landing-main">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Get Started with <br />
                <span className="hero-title-highlight">
                  Chef Duo Sales <br />
                  Forecast
                </span>
              </h1>

              <div className="hero-description">
                <h2 className="hero-subtitle">What this system does?</h2>
                <p className="hero-paragraph">
                  ChefDuo forecast looks at your past sales to predict how much
                  you'll likely sell each day, and how much of each ingredient
                  you'll need to prepare it.
                </p>
              </div>
            </div>

            {/* Right Column - Dashboard with Floating Cards */}
            <div className="hero-visual">
              <div className="dashboard-wrapper">
                <div ref={dashboardRef} className="dashboard-card">
                  <img
                    src="../src/assets/landing/Rectangle.png"
                    alt="Chef Duo Sales Forecasting Dashboard"
                    className="dashboard-image"
                  />
                </div>

                {/* Floating Card 1 - Top Left - Image */}
                <div ref={card1Ref} className="floating-card card-1">
                  <img
                    src={card1Img}
                    alt="Sales Analytics"
                    className="floating-image"
                  />
                </div>

                {/* Floating Card 2 - Top Right - Image */}
                <div ref={card2Ref} className="floating-card card-2">
                  <img
                    src={card2Img}
                    alt="Forecast Trends"
                    className="floating-image"
                  />
                </div>

                {/* Floating Card 3 - Bottom Right - Image */}
                <div ref={card3Ref} className="floating-card card-3">
                  <img
                    src={card3Img}
                    alt="Inventory Planning"
                    className="floating-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-header-landing">
            <h2 className="upload-main-title">
              Step 1: Upload your Sales Data
            </h2>
          </div>

          <div className="upload-grid">
            {/* Column 1: Steps */}
            <div className="upload-column upload-column-steps">
              <h3 className="column-title">
                The system needs your sales history to learn your demand
                patterns.
              </h3>
              <ul className="upload-steps">
                <li>Export your sales data from POS as CSV or Excel</li>
                <li>Go to the Data Management tab (top navigation bar)</li>
                <li>Drag and drop or browse to upload your file</li>
              </ul>
              <div className="column-file-format">
                <p>
                  Your file should have:{" "}
                  <strong>Date, Item, Quantity, Revenue</strong>
                </p>
              </div>
            </div>

            <div className="upload-column upload-column-data">
              <div className="data-content">
                <Link
                  to="/data-management"
                  className="upload-to-datamanagement"
                >
                  Go to Data Management
                </Link>
                <div className="data-image-wrapper" onClick={handleUploadClick}>
                  <img
                    src="../src/assets/landing/Upload.png"
                    alt="Upload Excel file"
                    className="data-image"
                  />

                  {/* Upload Overlay Content */}
                  <div className="upload-overlay">
                    <FiUploadCloud className="upload-icon-big" />
                    <p className="upload-overlay-title">
                      Upload your Excel file
                    </p>
                    <p className="upload-overlay-subtitle">
                      CSV, XLSX, or XLS format
                    </p>
                    <div className="upload-formats">
                      <span className="format-tag">.csv</span>
                      <span className="format-tag">.xlsx</span>
                      <span className="format-tag">.xls</span>
                    </div>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".csv,.xlsx,.xls"
                    style={{ display: "none" }}
                  />
                </div>

                {/* Mascot */}
                <div className="image-person">
                  <img
                    src="../src/assets/landing/UploadMascot.png"
                    alt="Mascot"
                    className="data-image-person"
                  />
                </div>
              </div>
            </div>

            <div className="upload-column upload-column-data">
              <h3 className="column-title">How much data should you upload?</h3>
              <div className="upload-1">
                For best results, upload at least <strong>6 months</strong> of
                sales history or more. This gives the system enough data to
                detect weekly demand patterns and payday cycles (15th and 30th
                of each month).
              </div>
              <br />
              <div className="upload-2">
                Upload everything — more history means more accurate forecasts.
                The system will continue improving as you add new data.
              </div>
              <br />
              <div className="upload-3">
                <em>
                  "After your first upload, the system will take a few moments
                  to train your forecast model. You'll be notified when your
                  dashboard is ready."
                </em>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="upload-section">
        <div className="upload-container">
          <div className="upload-header-landing">
            <h2 className="upload-main-title">Step 2: View your Dashboard</h2>
            <p className="upload-subtitle">
              Once you've uploaded data, the system will start generating
              forecasts. The Dashboard is your command center.
            </p>

            {/* Dashboard Image with Absolute Cards */}
            <div className="landing-dashboard-wrapper">
              <div className="landing-dashboard-image">
                <img
                  src="../src/assets/landing/Dashboard.png"
                  alt="Dashboard Overview"
                  className="dashboard-overview-image"
                />
              </div>

              {/* Floating Cards - Positioned Absolutely on Dashboard */}
              <div className="dashboard-cards-absolute">
                {/* Card 1 - Top Left */}
                <div
                  ref={dashCard1Ref}
                  className="dashboard-card-absolute card-pos-1"
                >
                  <img
                    src="../src/assets/landing/landing-dashcard1.png"
                    alt="Sales Overview"
                    className="dashboard-card-absolute-image"
                  />
                </div>

                {/* Card 2 - Top Right */}
                <div
                  ref={dashCard2Ref}
                  className="dashboard-card-absolute card-pos-2"
                >
                  <img
                    src="../src/assets/landing/landing-dashcard2.png"
                    alt="Forecast Trends"
                    className="dashboard-card-absolute-image"
                  />
                </div>

                {/* Card 3 - Bottom Left */}
                <div
                  ref={dashCard3Ref}
                  className="dashboard-card-absolute card-pos-3"
                >
                  <img
                    src="../src/assets/landing/landing-dashcard3.png"
                    alt="Inventory Planning"
                    className="dashboard-card-absolute-image"
                  />
                </div>

                {/* Card 4 - Bottom Right */}
                <div
                  ref={dashCard4Ref}
                  className="dashboard-card-absolute card-pos-4"
                >
                  <img
                    src="../src/assets/landing/landing-dashcard4.png"
                    alt="Performance Metrics"
                    className="dashboard-card-absolute-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

         <section className="upload-section">
        <div className="upload-container">
          <div className="upload-header-landing">
            <h2 className="upload-main-title">Step 3: Explore Analytics</h2>
            <p className="upload-subtitle">
            Once you've uploaded data, the system will start generating forecasts. The Dashboard is your command center.
            </p>

            <div className="landing-dashboard-wrapper">
              <div className="landing-dashboard-image">
                <img
                  src="../src/assets/landing/Analytics.png"
                  alt="Dashboard Overview"
                  className="dashboard-overview-image"
                />
              </div>

              <div className="dashboard-cards-absolute">
                {/* Card 1 - Top Left */}
                <div
                  ref={analyticsCard1Ref}
                  className="dashboard-card-absolute analytics-card-pos-1"
                >
                  <img
                    src="../src/assets/landing/landing-analytics1.png"
                    alt="Sales Overview"
                    className="dashboard-card-absolute-image"
                  />
                </div>

                {/* Card 2 - Top Right */}
                <div
                  ref={analyticsCard2Ref}
                  className="dashboard-card-absolute analytics-card-pos-2"
                >
                  <img
                    src="../src/assets/landing/landing-analytics2.png"
                    alt="Forecast Trends"
                    className="dashboard-card-absolute-image"
                  />
                </div>

                {/* Card 3 - Bottom Left */}
                <div
                  ref={analyticsCard3Ref}
                  className="dashboard-card-absolute analytics-card-pos-3"
                >
                  <img
                    src="../src/assets/landing/landing-analytics3.png"
                    alt="Inventory Planning"
                    className="dashboard-card-absolute-image"
                  />
                </div>

                {/* Card 4 - Bottom Right */}
                <div
                  ref={analyticsCard4Ref}
                  className="dashboard-card-absolute analytics-card-pos-4"
                >
                  <img
                    src="../src/assets/landing/landing-analytics4.png"
                    alt="Performance Metrics"
                    className="dashboard-card-absolute-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          <section className="upload-section">
        <div className="upload-container">
          <div className="upload-header-landing">
            <h2 className="upload-main-title">Step 4: Set-up in Settings</h2>
            <p className="upload-subtitle">
Before you start using the system, here are a few things you might want to set up:            </p>

            <div className="landing-dashboard-wrapper">
              <div className="landing-dashboard-image">
                <img
                  src="../src/assets/landing/Analytics.png"
                  alt="Dashboard Overview"
                  className="dashboard-overview-image"
                />
              </div>

             
          </div>
        </div>  
        </div>
      </section>
    </div>
  );
};

export default ChefDuoLanding;
