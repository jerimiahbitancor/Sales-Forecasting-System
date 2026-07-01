
import "./AboutDocumentation.css";
import { FiPhone, FiMail } from "react-icons/fi";
import { useState } from "react";

function AboutDocumentation() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const developers = [
    { name: "Bitancor,", title: "Jerimiah A.", avatar: "https://via.placeholder.com/60" },
    { name: "Castillon,", title: "Bianca Rain C.", avatar: "https://via.placeholder.com/60" },
    { name: "Flavier,", title: "Laurence James L.", avatar: "https://via.placeholder.com/60" },
  ];

  const documentation = [
    { title: "User Manual" },
    { title: "Installation Guide" },
    { title: "System Documentation" },
  ];

  return (
    <div className="about-documentation-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="title-section">
          <h1 className="main-title">ChefDuo Sales Forecasting</h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis{" "}
            <a href="#">nostrud exercitation ullamco laboris.</a>
          </p>
          <div className="version">Version v1.0.0</div>
        </div>

        <div className="developers-section">
          <h3 className="section-title">Developers</h3>
          <div className="developers-grid">
            {developers.map((dev, index) => (
              <div key={index} className="developer-card">
                <div 
                  className="developer-avatar" 
                  style={{ backgroundImage: `url(${dev.avatar})` }}
                ></div>
                <p className="developer-name">{dev.name}</p>
                <p className="developer-title">{dev.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Section */}
      <div className="documentation-section">
        <h3 className="section-title">Documentation</h3>
        <div className="documentation-grid">
          {documentation.map((doc, index) => (
            <button
              key={index}
              className={`documentation-card ${selectedDoc === index ? 'active' : ''}`}
              onClick={() => setSelectedDoc(index)}
            >
              <div className="card-header1"></div>
              <p className="card-title">{doc.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h3 className="section-title">Contact Information</h3>
        <div className="contact-info">
          <div className="contact-item">
            <FiPhone className="contact-icon" />
            <p>Contact No.: +639123456789</p>
          </div>
          <div className="contact-item">
            <FiMail className="contact-icon" />
            <p>Email: BCFsupport@system.com</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Copyright © 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default AboutDocumentation;