// Dashboard.jsx
import { useState } from 'react';
import { 
  FaQuestionCircle, 
  FaArrowUp,
  FaInfoCircle
} from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState('line');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handleChartChange = (e) => {
    setSelectedChart(e.target.value);
    console.log(`Chart changed to: ${e.target.value}`);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    console.log(`Period changed to: ${e.target.value}`);
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <main className="dashboard-main">
        {/* Dashboard Title & Date */}
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="date-info">
            <span>4:00 PM</span>
            <span className="date-separator">Sunday</span>
            <span className="date-separator">06-21-2026</span>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="metrics-grid">
          {/* Predicted Sales Card */}
          <div className="metric-card border-red">
            <div className="card-header">
              <h3 className="card-title">Predicted Sales Today</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value-group">
              <span className="metric-value">₱ 45,000</span>
              <div className="badge-success">
                <FaArrowUp className="badge-icon" />
                +12%
              </div>
            </div>
            <p className="metric-subtext">vs last month performance</p>
          </div>

          {/* Actual Sales Card */}
          <div className="metric-card border-yellow">
            <div className="card-header">
              <h3 className="card-title">Actual Sales Yesterday</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value">₱ 50,000</div>
            <p className="metric-subtext">83% of monthly target met</p>
          </div>

          {/* Forecast Accuracy Card */}
          <div className="metric-card border-green">
            <div className="card-header">
              <h3 className="card-title">Forecast Accuracy</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value text-green">10%</div>
            <p className="metric-subtext small">Date: 2025/11/03 - 2025/11/16</p>
          </div>

          {/* Stock Alerts Card */}
          <div className="metric-card border-red-dark">
            <div className="card-header">
              <h3 className="card-title">Stock Requirement Alerts</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value text-red">12</div>
            <p className="metric-subtext">items need action</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content-grid">
          {/* Chart Section */}
          <div className="chart-section">
            <div className="chart-header">
              <div>
                <h2 className="chart-title">
                  Sales Overview
                  <FaQuestionCircle className="chart-info-icon" />
                </h2>
                <p className="chart-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div className="chart-controls">
                <select 
                  className="chart-select" 
                  value={selectedChart}
                  onChange={handleChartChange}
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                </select>
                <select 
                  className="chart-select"
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                >
                  <option value="week">Next Week</option>
                  <option value="month">Next Month</option>
                </select>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="chart-container">
              {/* Legend */}
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-line green"></span>
                  Actual Sales
                </div>
                <div className="legend-item">
                  <span className="legend-line blue"></span>
                  Forecasted Sales
                </div>
                <div className="legend-item">
                  <span className="legend-line dark-blue"></span>
                  Future Forecast
                </div>
              </div>

              <div className="chart-wrapper">
                <svg className="chart-svg" preserveAspectRatio="none" viewBox="0 0 1000 300">
                  {/* Grid Lines */}
                  <g stroke="#f0f0f0" strokeWidth="1">
                    <line x1="50" x2="50" y1="0" y2="280" />
                    <line x1="50" x2="950" y1="280" y2="280" />
                    <line x1="50" x2="950" y1="230" y2="230" />
                    <line x1="50" x2="950" y1="180" y2="180" />
                    <line x1="50" x2="950" y1="130" y2="130" />
                    <line x1="50" x2="950" y1="80" y2="80" />
                    <line x1="50" x2="950" y1="30" y2="30" />
                  </g>

                  {/* Actual Sales (Green) */}
                  <path d="M50 240 L200 200 L350 170 L500 130 L650 90 L800 60 L950 40" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="50" cy="240" fill="#22c55e" r="4" />
                  <circle cx="200" cy="200" fill="#22c55e" r="4" />
                  <circle cx="350" cy="170" fill="#22c55e" r="4" />
                  <circle cx="500" cy="130" fill="#22c55e" r="4" />
                  <circle cx="650" cy="90" fill="#22c55e" r="4" />
                  <circle cx="800" cy="60" fill="#22c55e" r="4" />
                  <circle cx="950" cy="40" fill="#22c55e" r="4" />

                  {/* Forecasted Sales (Light Blue) */}
                  <path d="M50 260 L200 230 L350 190 L500 150 L650 110 L800 70 L950 30" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <circle cx="50" cy="260" fill="#60a5fa" r="4" />
                  <circle cx="200" cy="230" fill="#60a5fa" r="4" />
                  <circle cx="350" cy="190" fill="#60a5fa" r="4" />
                  <circle cx="500" cy="150" fill="#60a5fa" r="4" />
                  <circle cx="650" cy="110" fill="#60a5fa" r="4" />
                  <circle cx="800" cy="70" fill="#60a5fa" r="4" />
                  <circle cx="950" cy="30" fill="#60a5fa" r="4" />

                  {/* Future Forecast (Dark Blue) */}
                  <path d="M50 270 L200 250 L350 220 L500 190 L650 170 L800 130 L950 100" fill="none" stroke="#1e40af" strokeWidth="2" />
                  <circle cx="50" cy="270" fill="#1e40af" r="4" />
                  <circle cx="200" cy="250" fill="#1e40af" r="4" />
                  <circle cx="350" cy="220" fill="#1e40af" r="4" />
                  <circle cx="500" cy="190" fill="#1e40af" r="4" />
                  <circle cx="650" cy="170" fill="#1e40af" r="4" />
                  <circle cx="800" cy="130" fill="#1e40af" r="4" />
                  <circle cx="950" cy="100" fill="#1e40af" r="4" />
                </svg>

                {/* Y Axis Labels */}
                <div className="y-axis-labels">
                  <span>6000</span>
                  <span>5000</span>
                  <span>4000</span>
                  <span>3000</span>
                  <span>2000</span>
                  <span>1000</span>
                  <span>0</span>
                </div>

                {/* Vertical Text (Sales) */}
                <div className="axis-label-vertical">Sales</div>

                {/* X Axis Labels */}
                <div className="x-axis-labels">
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                </div>

                {/* Axis Label: Date */}
                <div className="axis-label-horizontal">Date</div>
              </div>
            </div>
          </div>

          {/* Right Panel Placeholder Cards */}
          <div className="right-panel">
            <div className="placeholder-card">
              <div className="placeholder-content">
                <h3 className="placeholder-title">Recent Activity</h3>
                <p className="placeholder-text">No recent activity to display</p>
              </div>
            </div>
            <div className="placeholder-card">
              <div className="placeholder-content">
                <h3 className="placeholder-title">Top Products</h3>
                <p className="placeholder-text">No products data available</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;