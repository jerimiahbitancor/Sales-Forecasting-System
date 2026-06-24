import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import '../../../dashboard/pages/Dashboard.css';
import './ProductPerformance.css';

const ProductPerformance = () => {
  const [range, setRange] = useState('7');
  const summaryCards = [
    { label: 'High Demand', value: '12 Products', note: 'Top demand', color: 'border-red' },
    { label: 'Medium Demand', value: '18 Products', note: 'Moderate demand', color: 'border-yellow' },
    { label: 'Low Demand', value: '8 Products', note: 'Low demand', color: 'border-green' },
    { label: 'Best Seller', value: 'Sisig', note: 'Top seller', color: 'border-red-dark' },
  ];

  const barItems = [
    { product: 'Sisig', value: 100 },
    { product: 'Adobo', value: 65 },
    { product: 'Tonatsu', value: 50 },
    { product: 'Chicken', value: 35 },
    { product: 'Chick & Fries', value: 22 },
  ];

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dashboard-main performance-page">
        <div className="dashboard-title-section">
          <div className="dashboard-title-row">
            <h1 className="dashboard-title">Analytics</h1>
            <div className="breadcrumb">
              <span className="breadcrumb-link active">Product Performance</span>
            </div>
          </div>
        </div>

        <div className="summary-grid">
          {summaryCards.map((card) => (
            <div className={`summary-card ${card.color}`} key={card.label}>
              <div className="card-header">
                <h3 className="card-title">{card.label}</h3>
                <FaInfoCircle className="card-info" />
              </div>
              <div className="metric-value">{card.value}</div>
              <p className="metric-subtext">{card.note}</p>
            </div>
          ))}
        </div>

        <section className="performance-card">
          <div className="performance-header">
            <div>
              <h2 className="performance-title">Top & Low Sellers Bar Chart</h2>
              <p className="performance-description">A quick overview of product demand levels and best-selling items.</p>
            </div>
            <div className="range-selector">
              <select value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
            </div>
          </div>

          <div className="performance-chart">
            {barItems.map((item) => (
              <div className="bar-row" key={item.product}>
                <div className="bar-row-label">
                  <span className="bar-product">{item.product}</span>
                  <span className="bar-count">{item.value}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="performance-footer">
            <div className="classification-card">
              <h4>Demand Classification</h4>
              <ul>
                <li>Sisig - HIGH</li>
                <li>Adobo - HIGH</li>
                <li>Tonkatsu - MEDIUM</li>
              </ul>
            </div>

            <div className="export-actions-section">
              <button className="btn btn-primary">Export PDF</button>
              <button className="btn btn-outline">Export EXCEL</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductPerformance;
