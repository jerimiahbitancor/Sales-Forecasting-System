// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaChartBar,
  FaDatabase,
  FaChartPie,
  FaChevronDown,
  FaCog,
  FaRegBell,
  FaRegQuestionCircle,
  FaUser
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if any analytics sub-route is active
  const isAnalyticsActive = location.pathname === '/forecasting' || 
                           location.pathname === '/product-performance';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.nav-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

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
        
        <NavLink
          to="/analytics"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaChartPie className="nav-icon" />
          Analytics
        </NavLink>

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

        <NavLink
          to="/analytics"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => handleNavigation('/analytics')}
        >
          <FaChartPie className="nav-icon" />
          Analytics
        </NavLink>

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