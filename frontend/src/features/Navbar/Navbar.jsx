// components/Navbar.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleDropdownItemClick = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <header className="navbar">
      {/* Logo and Brand */}
      <div className="navbar-brand" onClick={() => handleNavigation('/')}>
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
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaChartBar className="nav-icon" />
          Dashboard
        </NavLink>

        <NavLink 
          to="/data-management" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaDatabase className="nav-icon" />
          Data Management
        </NavLink>
        
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
              <NavLink 
                to="/forecasting" 
                className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                onClick={() => handleDropdownItemClick('/forecasting')}
              >
                <FaChartPie className="dropdown-icon" />
                Forecasting
              </NavLink>
              <NavLink 
                to="/product-performance" 
                className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                onClick={() => handleDropdownItemClick('/product-performance')}
              >
                <FaChartBar className="dropdown-icon" />
                Product Performance
              </NavLink>
            </div>
          )}
        </div>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaCog className="nav-icon" />
          Settings
        </NavLink>
      </nav>

      {/* Header Actions */}
      <div className="navbar-actions">
        <button className="action-btn" aria-label="Notifications">
          <FaRegBell className="action-icon" />
        </button>
        <button className="action-btn" aria-label="Help">
          <FaRegQuestionCircle className="action-icon" />
        </button>
        <div className="profile-avatar" onClick={() => handleNavigation('/profile')}>
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
        <NavLink 
          to="/" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleNavigation('/')}
        >
          <FaChartBar className="nav-icon" />
          Dashboard
        </NavLink>

        <NavLink 
          to="/data-management" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleNavigation('/data-management')}
        >
          <FaDatabase className="nav-icon" />
          Data Management
        </NavLink>

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
              <NavLink 
                to="/forecasting" 
                className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                onClick={() => handleDropdownItemClick('/forecasting')}
              >
                <FaChartPie className="dropdown-icon" />
                Forecasting
              </NavLink>
              <NavLink 
                to="/product-performance" 
                className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                onClick={() => handleDropdownItemClick('/product-performance')}
              >
                <FaChartBar className="dropdown-icon" />
                Product Performance
              </NavLink>
            </div>
          )}
        </div>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleNavigation('/settings')}
        >
          <FaCog className="nav-icon" />
          Settings
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;