// components/Navbar.jsx
import { useState } from 'react';
import { 
  FaChartBar,
  FaDatabase,
  FaChartPie,
  FaChevronDown,
  FaCog,
  FaRegBell,
  FaRegQuestionCircle,
  FaUserCircle
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      {/* Logo and Brand */}
      <div className="navbar-brand">
        <div className="brand-logo">
          <img
            alt="Chef Duo Logo"
            className="logo"
            src="/logo.png"
          />
        </div>
        <span className="brand-text">Sales Forecasting</span>
      </div>

      {/* Navigation */}
      <nav className="navbar-nav">
        <a className="nav-link active" href="#">
          <FaChartBar className="nav-icon" />
          Dashboard
        </a>
        <a className="nav-link" href="#">
          <FaDatabase className="nav-icon" />
          Data Management
        </a>
        
        {/* Analytics Dropdown */}
        <div className="nav-dropdown">
          <button 
            className={`nav-link dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <FaChartPie className="nav-icon" />
            Analytics
            <FaChevronDown className={`nav-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <FaChartPie className="dropdown-icon" />
                Forecasting
              </a>
              <a href="#" className="dropdown-item">
                <FaChartBar className="dropdown-icon" />
                Product Performance
              </a>
            </div>
          )}
        </div>

        <a className="nav-link" href="#">
          <FaCog className="nav-icon" />
          Settings
        </a>
      </nav>

      {/* Header Actions */}
      <div className="navbar-actions">
        <button className="action-btn" aria-label="Notifications">
          <FaRegBell className="action-icon" />
        </button>
        <button className="action-btn" aria-label="Help">
          <FaRegQuestionCircle className="action-icon" />
        </button>
        <div className="profile-avatar">
          <FaUserCircle className="profile-icon" />
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-icon">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a className="nav-link active" href="#">
          <FaChartBar className="nav-icon" />
          Dashboard
        </a>
        <a className="nav-link" href="#">
          <FaDatabase className="nav-icon" />
          Data Management
        </a>
        <div className="mobile-dropdown">
          <button 
            className={`nav-link dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
            onClick={toggleDropdown}
          >
            <FaChartPie className="nav-icon" />
            Analytics
            <FaChevronDown className={`nav-arrow ${isDropdownOpen ? 'rotated' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="mobile-dropdown-menu">
              <a href="#" className="dropdown-item">
                <FaChartPie className="dropdown-icon" />
                Forecasting
              </a>
              <a href="#" className="dropdown-item">
                <FaChartBar className="dropdown-icon" />
                Product Performance
              </a>
            </div>
          )}
        </div>
        <a className="nav-link" href="#">
          <FaCog className="nav-icon" />
          Settings
        </a>
      </div>
    </header>
  );
};

export default Navbar;