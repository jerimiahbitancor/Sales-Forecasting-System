import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import '../../../dashboard/pages/Dashboard.css';
import './Forecasting.css';

const Forecasting = () => {
  const [chartType, setChartType] = useState('line');
  const [period, setPeriod] = useState('daily');
  const [product, setProduct] = useState('all');

  return (
    <div className="dashboard-container">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-title-section">
          <div className="dashboard-title-row">
            <h1 className="dashboard-title">Analytics</h1>
            <div className="breadcrumb">
              <span className="breadcrumb-link active">Forecasting</span>
            </div>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card border-red">
            <div className="card-header">
              <h3 className="card-title">Forcasted Items</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value">42 items</div>
            <p className="metric-subtext">Products forecasted</p>
          </div>

          <div className="metric-card border-yellow">
            <div className="card-header">
              <h3 className="card-title">Average Accuracy</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value">92.4%</div>
            <p className="metric-subtext">Prediction accuracy</p>
          </div>

          <div className="metric-card border-green">
            <div className="card-header">
              <h3 className="card-title">Highest Forecast</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value">Sisig</div>
            <p className="metric-subtext">Top forecast</p>
          </div>

          <div className="metric-card border-red-dark">
            <div className="card-header">
              <h3 className="card-title">Growth Rate</h3>
              <FaInfoCircle className="card-info" />
            </div>
            <div className="metric-value text-green">+12.5%</div>
            <p className="metric-subtext">Expected increase</p>
          </div>
        </div>

        <div className="main-content-grid1">
          <div className="chart-section">
            <div className="chart-header">
              <div>
                <h2 className="chart-title">
                  Sales Prediction Chart
                  <FaQuestionCircle className="chart-info-icon" />
                </h2>
                <p className="chart-description">Actual Sales vs Forecast vs Future Forecast</p>
              </div>

              <div className="chart-controls">
                <select className="chart-select" value={period} onChange={(e) => setPeriod(e.target.value)}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>

                <select className="chart-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                </select>

                <select className="chart-select" value={product} onChange={(e) => setProduct(e.target.value)}>
                  <option value="all">Product</option>
                  <option value="sisig">Sisig</option>
                  <option value="adobo">Adobo</option>
                </select>
              </div>
            </div>

            <div className="chart-container">
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
                {/* simple SVG placeholder copied from Dashboard for visual parity */}
                <svg className="chart-svg" preserveAspectRatio="none" viewBox="0 0 1000 300">
                  <g stroke="#f0f0f0" strokeWidth="1">
                    <line x1="50" x2="50" y1="0" y2="280" />
                    <line x1="50" x2="950" y1="280" y2="280" />
                    <line x1="50" x2="950" y1="230" y2="230" />
                    <line x1="50" x2="950" y1="180" y2="180" />
                    <line x1="50" x2="950" y1="130" y2="130" />
                    <line x1="50" x2="950" y1="80" y2="80" />
                    <line x1="50" x2="950" y1="30" y2="30" />
                  </g>

                  <path d="M50 240 L200 200 L350 170 L500 130 L650 90 L800 60 L950 40" fill="none" stroke="#22c55e" strokeWidth="2" />
                  <path d="M50 260 L200 230 L350 190 L500 150 L650 110 L800 70 L950 30" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M50 270 L200 250 L350 220 L500 190 L650 170 L800 130 L950 100" fill="none" stroke="#1e40af" strokeWidth="2" />
                </svg>

                <div className="y-axis-labels">
                  <span>6000</span>
                  <span>5000</span>
                  <span>4000</span>
                  <span>3000</span>
                  <span>2000</span>
                  <span>1000</span>
                  <span>0</span>
                </div>

                <div className="axis-label-vertical">Sales</div>

                <div className="x-axis-labels">
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                  <span>Text</span>
                </div>

                <div className="axis-label-horizontal">Date</div>
              </div>

              <div className="insights-and-actions">
                <div className="model-insights">
                  <h4>Model Insights</h4>
                  <ul>
                    <li>Sisig demand expected to increase 15%</li>
                    <li>Weekend demand remains highest</li>
                    <li>Forecast confidence: High</li>
                  </ul>
                </div>

                <div className="export-actions">
                  <button className="btn btn-primary">Export PDF</button>
                  <button className="btn btn-outline">Export EXCEL</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Forecasting;
