// components/ProductPerformance.jsx
import { FiChevronDown, FiSearch, FiCalendar } from "react-icons/fi";
import InfoBanner from "./shared/InfoBanner.jsx";
import "./shared/InfoBanner.css";
import "./ProductPerformance.css";

// ---------------------------------------------------------------------
// Mock data — replace with the real /api/analytics/product-performance
// response. `zone` drives bar color, `demandLevel` drives the pill in
// the table, and `actionSignal` is the recommended action copy.
// ---------------------------------------------------------------------
const demandRows = [
  { product: "Poppers & Rice", forecastQty: 52, zone: "high", demandLevel: "High Demand", actionSignal: "Prepare Extra Stock" },
  { product: "Breaded Tonkatsu", forecastQty: 38, zone: "high", demandLevel: "Medium Demand", actionSignal: "Standard Preparation" },
  { product: "Chick & Fries", forecastQty: 44, zone: "medium", demandLevel: "High Demand", actionSignal: "Prepare Extra Stock" },
  { product: "Cheesy Tapa", forecastQty: 18, zone: "low", demandLevel: "Low Demand", actionSignal: "Prepare Less" },
];

const performanceRows = [
  { rank: 1, product: "Poppers & Rice", qtySold: 48, revenue: "₱6,750", ratio: 1.55, actionSignal: "Keep on Menu — top performer" },
  { rank: 2, product: "Breaded Tonkatsu", qtySold: 37, revenue: "₱5,700", ratio: 1.19, actionSignal: "Above average — maintain" },
  { rank: 3, product: "Chick & Fries", qtySold: 29, revenue: "₱4,800", ratio: 0.94, actionSignal: "Near average — monitor" },
  { rank: 4, product: "Cheesy Tapa", qtySold: 18, revenue: "₱1,800", ratio: 0.58, actionSignal: "Below average — consider promo or review" },
];

const activeProducts = [
  { product: "Breaded Tonkatsu", daysOnMenu: "6 months", forecastStatus: "Forecast Running" },
  { product: "Poppers & Rice", daysOnMenu: "5 months", forecastStatus: "Forecast Running" },
];

const newProducts = [
  { product: "Ice Sago", daysOnMenu: "12 days", forecastStatus: "Forecast in 16 days" },
  { product: "Bulalo", daysOnMenu: "10 days", forecastStatus: "Forecast in 18 days" },
];

const inactiveProducts = [
  { product: "Bicol Express", lastSale: "25 days ago", forecastStatus: "Auto flagged in 3 days" },
  { product: "Kaldereta", lastSale: "20 days ago", forecastStatus: "Auto flagged in 8 days" },
];

const zoneClass = { high: "bar--high", medium: "bar--medium", low: "bar--low" };
const pillClass = {
  "High Demand": "pill--high",
  "Medium Demand": "pill--medium",
  "Low Demand": "pill--low",
};

// Horizontal bar: forecast qty relative to the largest value in the set
function DemandBar({ label, qty, maxQty, zone }) {
  const widthPct = Math.max((qty / maxQty) * 100, 6);
  return (
    <div className="demand-bar-row">
      <span className="demand-bar-label">{label}</span>
      <div className="demand-bar-track">
        <div className={`demand-bar-fill ${zoneClass[zone]}`} style={{ width: `${widthPct}%` }}>
          <span className="demand-bar-value">{qty} servings</span>
        </div>
      </div>
    </div>
  );
}

// Diverging bar centered on ratio = 1.0 (store average)
function RatioBar({ label, ratio }) {
  // Map ratio range [0.2, 1.8] onto a 0-100% track, with 1.0 at center (50%)
  const min = 0.2;
  const max = 1.8;
  const center = 50;
  const pct = ((ratio - min) / (max - min)) * 100;
  const isAbove = ratio >= 1.0;
  const barStart = isAbove ? center : pct;
  const barWidth = Math.abs(pct - center);

  return (
    <div className="ratio-bar-row">
      <span className="ratio-bar-label">{label}</span>
      <div className="ratio-bar-track">
        <div className="ratio-bar-center-line" />
        <div
          className={`ratio-bar-fill ${isAbove ? "ratio-bar-fill--above" : "ratio-bar-fill--below"}`}
          style={{ left: `${barStart}%`, width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

function ProductPerformance() {
  const maxQty = Math.max(...demandRows.map((r) => r.forecastQty));

  return (
    <>
      <div className="analytics-col-main">
        {/* Demand Classification */}
        <section className="analytics-card">
          <h2 className="analytics-card-title">Demand Classification</h2>

          <div className="analytics-filter-row">
            <span className="filter-pill">
              <FiCalendar size={14} /> Week: June 20–26, 2026 <FiChevronDown size={14} />
            </span>
            <span className="filter-search">
              <FiSearch size={14} /> Search Product
            </span>
            <span className="filter-pill">
              Date <FiChevronDown size={14} />
            </span>
          </div>

          <p className="section-note">
            Demand level per product — tomorrow, Jun 25. Bar shows tomorrow's forecast.
            Colored zones show what's normal vs. above normal for each product.
          </p>

          <div className="demand-bar-chart">
            {demandRows.map((row) => (
              <DemandBar
                key={row.product}
                label={row.product}
                qty={row.forecastQty}
                maxQty={maxQty}
                zone={row.zone}
              />
            ))}
          </div>

          <div className="chart-legend">
            <span className="legend-item"><span className="legend-swatch legend-swatch--low" /> Low Zone</span>
            <span className="legend-item"><span className="legend-swatch legend-swatch--medium" /> Medium Zone</span>
            <span className="legend-item"><span className="legend-swatch legend-swatch--high" /> High Zone</span>
          </div>

          <table className="analytics-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Product</th>
                <th>Forecast Qty. (Tomorrow)</th>
                <th>Demand Level</th>
                <th>Action Signal</th>
              </tr>
            </thead>
            <tbody>
              {demandRows.map((row, i) => (
                <tr key={row.product}>
                  <td>{i + 1}</td>
                  <td>{row.product}</td>
                  <td>{row.forecastQty} servings</td>
                  <td>
                    <span className={`pill ${pillClass[row.demandLevel]}`}>{row.demandLevel}</span>
                  </td>
                  <td className="action-signal">{row.actionSignal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Product Performance Ratio Analysis */}
        <section className="analytics-card">
          <h2 className="analytics-card-title">Product Performance Ratio Analysis</h2>

          <div className="analytics-filter-row">
            <span className="filter-pill">
              <FiCalendar size={14} /> Week: June 20–26, 2026 <FiChevronDown size={14} />
            </span>
            <span className="filter-search">
              <FiSearch size={14} /> Search Product
            </span>
            <span className="filter-pill">
              Last 7 Days <FiChevronDown size={14} />
            </span>
          </div>

          <p className="section-note">
            How each dish compares to your store average. The center line is your store's
            average. Bars going right = selling better than average. Bars going left =
            selling below average.
          </p>

          <div className="ratio-bar-chart">
            {performanceRows.map((row) => (
              <RatioBar key={row.product} label={row.product} ratio={row.ratio} />
            ))}
            <div className="ratio-bar-axis">
              <span>← Below Average</span>
              <span>Store Average (1.0)</span>
              <span>Above Average →</span>
            </div>
          </div>

          <div className="chart-legend">
            <span className="legend-item"><span className="legend-swatch legend-swatch--above" /> Above Average (ratio &gt; 1.0)</span>
            <span className="legend-item"><span className="legend-swatch legend-swatch--below" /> Below Average (ratio &lt; 1.0)</span>
          </div>

          <table className="analytics-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th>Quantity Sold</th>
                <th>Revenue</th>
                <th>Performance Ratio</th>
                <th>Action Signal</th>
              </tr>
            </thead>
            <tbody>
              {performanceRows.map((row) => (
                <tr key={row.product}>
                  <td>{row.rank}</td>
                  <td>{row.product}</td>
                  <td>{row.qtySold}</td>
                  <td>{row.revenue}</td>
                  <td className={row.ratio >= 1 ? "value--success" : "value--error"}>
                    {row.ratio.toFixed(2)} {row.ratio >= 1 ? "▲" : "▼"}
                  </td>
                  <td className="action-signal">{row.actionSignal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="table-footnote">
            Ratio above 1.0 = outperforming store average · Ratio below 1.0 = underperforming
          </p>
        </section>
      </div>

      <div className="analytics-col-side">
        <button type="button" className="btn-generate-report">
          Generate Report
        </button>

        <section className="analytics-card">
          <h2 className="analytics-card-title">Product Status</h2>

          <InfoBanner variant="info">
            System auto-flags products with 0 sales for 28 consecutive days for Inactive
            products. New products need 4 weeks of data before forecast activates.
          </InfoBanner>

          <div className="status-group">
            <p className="status-group-title">Active Product</p>
            <p className="status-group-subtitle">There are 50 menu items active</p>
            <table className="analytics-table analytics-table--compact">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Days on Menu</th>
                  <th>Forecast Status</th>
                </tr>
              </thead>
              <tbody>
                {activeProducts.map((row, i) => (
                  <tr key={row.product}>
                    <td>{i + 1}</td>
                    <td>{row.product}</td>
                    <td>{row.daysOnMenu}</td>
                    <td className="value--success">{row.forecastStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="status-group">
            <p className="status-group-title">New Product</p>
            <p className="status-group-subtitle">
              New product needs 4 weeks of data before forecast activates
            </p>
            <table className="analytics-table analytics-table--compact">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Days on Menu</th>
                  <th>Forecast Status</th>
                </tr>
              </thead>
              <tbody>
                {newProducts.map((row, i) => (
                  <tr key={row.product}>
                    <td>{i + 1}</td>
                    <td>{row.product}</td>
                    <td>{row.daysOnMenu}</td>
                    <td className="value--warning">{row.forecastStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="status-group">
            <p className="status-group-title">Inactive Product</p>
            <p className="status-group-subtitle">
              System auto-flags product inactive with 0 sales for 28 consecutive days
            </p>
            <table className="analytics-table analytics-table--compact">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product</th>
                  <th>Last Sale</th>
                  <th>Forecast Status</th>
                </tr>
              </thead>
              <tbody>
                {inactiveProducts.map((row, i) => (
                  <tr key={row.product}>
                    <td>{i + 1}</td>
                    <td>{row.product}</td>
                    <td>{row.lastSale}</td>
                    <td className="value--error">{row.forecastStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductPerformance;