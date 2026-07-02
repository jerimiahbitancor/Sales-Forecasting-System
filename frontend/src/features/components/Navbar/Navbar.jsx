// components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaChartBar,
  FaDatabase,
  FaChartPie,
  FaChevronDown,
  FaCog,
  FaRegBell,
  FaRegQuestionCircle,
  FaUser,
  FaChartLine,
  FaBoxes,
  FaClipboardList,
  FaStore,
  FaUtensils
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if any analytics sub-route is active
  const isAnalyticsActive = location.pathname === '/analytics' || 
                           location.pathname === '/forecasting' || 
                           location.pathname === '/product-performance' ||
                           location.pathname === '/ingredient-demand';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

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
    setIsMobileMenuOpen(false);
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

      {/* Navigation - Desktop */}
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
        <div className="nav-dropdown" ref={dropdownRef}>
          <button 
            className={`nav-link dropdown-toggle ${isAnalyticsActive ? 'active' : ''}`}
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <FaChartPie className="nav-icon" />
            Analytics
            <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
          </button>
          
          <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            <button 
              className="dropdown-item"
              onClick={() => handleDropdownItemClick('/forecasting')}
            >
              <FaChartLine className="dropdown-icon" />
              <span>Forecasting</span>
            </button>
            <button 
              className="dropdown-item"
              onClick={() => handleDropdownItemClick('/product-performance')}
            >
              <FaBoxes className="dropdown-icon" />
              <span>Product Performance</span>
            </button>
            <button 
              className="dropdown-item"
              onClick={() => handleDropdownItemClick('/ingredient-demand')}
            >
              <FaUtensils className="dropdown-icon" />
              <span>Ingredient Demand</span>
            </button>
          </div>
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
        <div className="profile-section" onClick={() => handleNavigation('/profile')}>
          <div className="profile-avatar">
            <FaUser className="profile-icon" />
          </div>
          <div className="profile-info">
            <span className="profile-name">Owner</span>
            <span className="profile-role">Administrator</span>
          </div>
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
          to="/dashboard" 
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleNavigation('/dashboard')}
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

        {/* Mobile Analytics with Sub-items */}
        <div className="mobile-dropdown">
          <div className="mobile-dropdown-header" onClick={() => {
            navigate('/analytics');
            setIsMobileMenuOpen(false);
          }}>
            <FaChartPie className="nav-icon" />
            Analytics
          </div>
          <div className="mobile-dropdown-items">
            <button 
              className="mobile-dropdown-item"
              onClick={() => handleDropdownItemClick('/forecasting')}
            >
              <FaChartLine className="dropdown-icon" />
              Forecasting
            </button>
            <button 
              className="mobile-dropdown-item"
              onClick={() => handleDropdownItemClick('/product-performance')}
            >
              <FaBoxes className="dropdown-icon" />
              Product Performance
            </button>
            <button 
              className="mobile-dropdown-item"
              onClick={() => handleDropdownItemClick('/ingredient-demand')}
            >
              <FaUtensils className="dropdown-icon" />
              Ingredient Demand
            </button>
          </div>
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