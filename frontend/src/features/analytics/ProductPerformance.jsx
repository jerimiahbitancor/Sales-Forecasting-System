import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import Navbar from '../components/Navbar/Navbar';
import '../dashboard/pages/Dashboard.css';
import './ProductPerformance.css';

const ProductPerformance = () => {
  const [range, setRange] = useState('7');

  // Tooltips
  const tooltips = {
    demandClassification: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#fe6161', display: 'block', marginBottom: '6px' }}>
          Demand Classification
        </strong>
        The system automatically sorts each dish into High, Medium, or Low demand - based on that dish's own sales history, not a fixed number. A dish selling 20 servings might be "High" if it rarely sells that much.
        <br/><br/>
        <div style={{ margin: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>●</span>
            <span><strong>High Demand</strong> - Prepare extra stock</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>●</span>
            <span><strong>Medium Demand</strong> - Standard preparation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>●</span>
            <span><strong>Low Demand</strong> - Reduce preparation</span>
          </div>
        </div>
        <br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          High if Forecast &gt; P80 • Medium if P40 ≤ Forecast ≤ P80 • Low if Forecast &lt; P40
        </span>
      </div>
    ),
    performanceRatio: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#fe6161', display: 'block', marginBottom: '6px' }}>
          Performance Ratio Analysis
        </strong>
        This compares each dish's sales to your store's average. The center line is your store average.
        <br/><br/>
        <div style={{ margin: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>→</span>
            <span><strong>Bars to the right</strong> = Selling better than average - keep these on the menu</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>→</span>
            <span><strong>Bars to the left</strong> = Selling below average - consider a promo or reviewing the dish</span>
          </div>
        </div>
        <br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Performance Ratio = Actual Qty Sold / Rolling Average Qty Sold (all active products)
        </span>
      </div>
    ),
    productStatus: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#fe6161', display: 'block', marginBottom: '6px' }}>
          Product Status Detection
        </strong>
        <div style={{ margin: '8px 0' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#22c55e' }}>New Product Detection</strong>
            <br/>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Auto-detected when product is added to menu
            </span>
            <br/>
            <span style={{ fontSize: '12px' }}>
              System needs at least 4 weeks of sales data before it can generate a reliable forecast
            </span>
          </div>
          <div>
            <strong style={{ color: '#ef4444' }}>Discontinued Product Detection</strong>
            <br/>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Auto-flags products with 0 sales for 28 consecutive days
            </span>
            <br/>
            <span style={{ fontSize: '12px' }}>
              Inactive products are excluded from active training and forecasting but retained in historical dataset
            </span>
          </div>
        </div>
        <br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Flags help you manage your product lifecycle
        </span>
      </div>
    ),
    highDemand: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#ef4444', display: 'block', marginBottom: '6px' }}>
          High Demand Products
        </strong>
        Products expected to have high sales volume tomorrow.
        <br/><br/>
        <strong>12 Products</strong> currently classified as High Demand.
        <br/><br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Priority products for inventory and preparation
        </span>
      </div>
    ),
    mediumDemand: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '6px' }}>
          Medium Demand Products
        </strong>
        Products expected to have moderate sales volume tomorrow.
        <br/><br/>
        <strong>18 Products</strong> currently classified as Medium Demand.
        <br/><br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Moderate priority products - keep in stock
        </span>
      </div>
    ),
    lowDemand: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#22c55e', display: 'block', marginBottom: '6px' }}>
          Low Demand Products
        </strong>
        Products expected to have low sales volume tomorrow.
        <br/><br/>
        <strong>8 Products</strong> currently classified as Low Demand.
        <br/><br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Consider running promotions or replacing these items
        </span>
      </div>
    ),
    bestSeller: (
      <div style={{ padding: '4px 0', fontSize: '13px', lineHeight: '1.6' }}>
        <strong style={{ color: '#34d399', display: 'block', marginBottom: '6px' }}>
          Best Seller
        </strong>
        The top performing product in your store.
        <br/><br/>
        <strong>Sisig</strong> is currently the best seller with:
        <br/>
        • Highest sales volume
        <br/>
        • Strong customer preference
        <br/>
        • Consistent demand
        <br/><br/>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Keep this product well-stocked
        </span>
      </div>
    )
  };

  const summaryCards = [
    { 
      label: 'High Demand', 
      value: '12 Products', 
      note: 'Prepare extra stock', 
      color: 'border-red',
      tooltip: tooltips.highDemand
    },
    { 
      label: 'Medium Demand', 
      value: '18 Products', 
      note: 'Standard preparation', 
      color: 'border-yellow',
      tooltip: tooltips.mediumDemand
    },
    { 
      label: 'Low Demand', 
      value: '8 Products', 
      note: 'Reduce preparation', 
      color: 'border-green',
      tooltip: tooltips.lowDemand
    },
    { 
      label: 'Best Seller', 
      value: 'Sisig', 
      note: 'Top seller', 
      color: 'border-red-dark',
      tooltip: tooltips.bestSeller
    },
  ];

  const barItems = [
    { product: 'Sisig', value: 100, ratio: 1.8 },
    { product: 'Poppers Series', value: 85, ratio: 1.6 },
    { product: 'Cheesy Spicy Tocino', value: 75, ratio: 1.4 },
    { product: 'OG Tapsilog', value: 65, ratio: 1.2 },
    { product: 'Breaded Porkchop', value: 55, ratio: 1.0 },
    { product: 'Chicken Sriracha', value: 45, ratio: 0.8 },
    { product: 'Lechon Kawali', value: 35, ratio: 0.6 },
    { product: 'Sizzling Sisig', value: 25, ratio: 0.5 },
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
                <Tippy
                  content={card.tooltip}
                  placement="top"
                  animation="scale"
                  duration={200}
                  theme="dark"
                  arrow={true}
                  delay={[100, 0]}
                  maxWidth={320}
                  interactive={true}
                >
                  <span className="icon-wrapper">
                    <FaInfoCircle className="card-info" />
                  </span>
                </Tippy>
              </div>
              <div className="metric-value">{card.value}</div>
              <p className="metric-subtext">{card.note}</p>
            </div>
          ))}
        </div>

        <section className="performance-card">
          <div className="performance-header">
            <div>
              <h2 className="performance-title">
                Product Performance Ratio
                <Tippy
                  content={tooltips.performanceRatio}
                  placement="right"
                  animation="scale"
                  duration={200}
                  theme="dark"
                  arrow={true}
                  delay={[100, 0]}
                  maxWidth={350}
                  interactive={true}
                >
                  <span className="chart-info-wrapper">
                    <FaInfoCircle className="performance-info-icon" />
                  </span>
                </Tippy>
              </h2>
              <p className="performance-description">
                Compares each dish's sales to your store's average. Bars to the right outperform average.
              </p>
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
                  <div className="bar-stats">
                    <span className="bar-count">{item.value} units</span>
                    <span className={`bar-ratio ${item.ratio >= 1.0 ? 'ratio-high' : 'ratio-low'}`}>
                      {item.ratio.toFixed(1)}x
                    </span>
                  </div>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${item.value}%` }} />
                  {item.ratio >= 1.0 ? (
                    <span className="bar-indicator high">▲ Above average</span>
                  ) : (
                    <span className="bar-indicator low">▼ Below average</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="performance-footer">
            <div className="classification-card">
              <h4>
                Demand Classification
                <Tippy
                  content={tooltips.demandClassification}
                  placement="top"
                  animation="scale"
                  duration={200}
                  theme="dark"
                  arrow={true}
                  delay={[100, 0]}
                  maxWidth={350}
                  interactive={true}
                >
                  <span className="classification-icon-wrapper">
                    <FaInfoCircle className="classification-info-icon" />
                  </span>
                </Tippy>
              </h4>
              <ul>
                <li><span className="high-dot"></span> Sisig - HIGH</li>
                <li><span className="high-dot"></span> Poppers Series - HIGH</li>
                <li><span className="medium-dot"></span> Cheesy Spicy Tocino - MEDIUM</li>
                <li><span className="medium-dot"></span> OG Tapsilog - MEDIUM</li>
                <li><span className="medium-dot"></span> Breaded Porkchop - MEDIUM</li>
                <li><span className="low-dot"></span> Chicken Sriracha - LOW</li>
                <li><span className="low-dot"></span> Lechon Kawali - LOW</li>
                <li><span className="low-dot"></span> Sizzling Sisig - LOW</li>
              </ul>
              <div className="status-note">
                <Tippy
                  content={tooltips.productStatus}
                  placement="top"
                  animation="scale"
                  duration={200}
                  theme="dark"
                  arrow={true}
                  delay={[100, 0]}
                  maxWidth={350}
                  interactive={true}
                >
                  <span className="status-link">
                    View Product Status Details
                  </span>
                </Tippy>
              </div>
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