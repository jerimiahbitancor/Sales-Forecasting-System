// Dashboard.jsx
import { useState } from "react";
import { FaQuestionCircle, FaArrowUp, FaInfoCircle } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
const Dashboard = () => {
  const [selectedChart, setSelectedChart] = useState("line");
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const handleChartChange = (e) => {
    setSelectedChart(e.target.value);
    console.log(`Chart changed to: ${e.target.value}`);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    console.log(`Period changed to: ${e.target.value}`);
  };

  // Tooltip content with detailed explanations
  const tooltips = {
    // 1. Predicted Sales Today
    sales: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        This is your estimated total sales for tomorrow.
        <br />
        <br />
        It also tells you if tomorrow is expected to be busier or slower than a
        typical [Tuesday/Friday/etc.].
        <br />
        <br />
        <strong style={{ color: "#22c55e" }}>✓ If it's higher:</strong> You
        might need extra staff and ingredients.
        <br />
        <strong style={{ color: "#ef4444" }}>✓ If it's lower:</strong> You can
        save money by preparing less.
        <br />
        <br />
        <span
          style={{
            color: "#60a5fa",
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Click to view detailed forecast in Analytics →
        </span>
      </div>
    ),

    // 2. Actual Sales Yesterday
    actual: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        This is the actual amount you earned yesterday. It compares yesterday's
        results against what the system predicted.
        <br />
        <br />
        <strong style={{ color: "#22c55e" }}>
          ✓ If it's close to the forecast:
        </strong>{" "}
        The system is working well.
        <br />
        <strong style={{ color: "#fbbf24" }}>
          ✓ If it's much higher or lower:
        </strong>{" "}
        Something unusual happened (weather, holiday, or a specific item sold
        out).
        <br />
        <br />
        <span
          style={{
            color: "#60a5fa",
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Click to view detailed sales breakdown →
        </span>
      </div>
    ),

    // 3. Forecast Accuracy Score
    accuracy: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        This tells you how reliable today's quantity forecasts are.
        <br />
        <br />
        <div style={{ margin: "8px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span style={{ color: "#22c55e", fontWeight: "bold" }}>●</span>
            <span>
              <strong>Above 90%</strong> → Excellent. You can rely on these
              numbers.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span style={{ color: "#60a5fa", fontWeight: "bold" }}>●</span>
            <span>
              <strong>80-90%</strong> → Good. Still useful for planning.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>●</span>
            <span>
              <strong>70-80%</strong> → Fair. Use with caution.
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#ef4444", fontWeight: "bold" }}>●</span>
            <span>
              <strong>Below 70%</strong> → Low. Consider uploading more data.
            </span>
          </div>
        </div>
        <br />
        Accurate quantity forecasts help you order ingredients closer to actual
        demand, reducing waste and stockouts.
        <br />
        <br />
        <span
          style={{
            color: "#60a5fa",
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Click to view detailed accuracy report →
        </span>
      </div>
    ),

    // 4. Ingredient Preparation Alert
    stock: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        These are the top ingredients you should prepare or buy for tomorrow.
        <br />
        <br />
        This is based on your predicted menu sales and your recipe portions.
        <br />
        <br />
        <strong style={{ color: "#fbbf24" }}>Pro Tip:</strong>
        <br />
        Double-check your actual fridge/freezer stock before buying. This tells
        you what you'll likely need, not what you're running out of.
        <br />
        <br />
        <span
          style={{
            color: "#60a5fa",
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Click to view full ingredient demand breakdown in Analytics →
        </span>
      </div>
    ),

    // 5. Sales Overview Chart
    chart: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        A quick visual of how your sales are trending.
        <br />
        <br />
        <div style={{ margin: "8px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "3px",
                background: "#22c55e",
                borderRadius: "2px",
              }}
            ></span>
            <span>
              <strong>Green Line</strong> = What actually sold (past data)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "3px",
                background: "#60a5fa",
                borderRadius: "2px",
              }}
            ></span>
            <span>
              <strong>Blue Line</strong> = What the system predicted
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "3px",
                background: "#1e40af",
                borderRadius: "2px",
              }}
            ></span>
            <span>
              <strong>Purple Line</strong> = What the system predicts for the
              coming days
            </span>
          </div>
        </div>
        <br />
        When the Blue and Green lines are close together, the system is very
        accurate. This helps you plan confidently.
      </div>
    ),

    // 6. Top Best Sellers (Product Performance)
    bestSellers: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        These are your money-makers right now.
        <br />
        <br />
        The number shows how many servings were sold. The ratio tells you how
        they compare to your average item.
        <br />
        <br />
        <div style={{ margin: "8px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <span style={{ color: "#22c55e", fontWeight: "bold" }}>●</span>
            <span>
              <strong>Ratio above 1.0</strong> = Better than average{" "}
              <span style={{ color: "#22c55e" }}>(Keep this on the menu!)</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#ef4444", fontWeight: "bold" }}>●</span>
            <span>
              <strong>Ratio below 1.0</strong> = Below average{" "}
              <span style={{ color: "#fbbf24" }}>
                (Consider running a promo or replacing it)
              </span>
            </span>
          </div>
        </div>
        <br />
        Use this to decide which items to prioritize when buying ingredients.
        <br />
        <br />
        <span
          style={{
            color: "#60a5fa",
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Click to view detailed product analysis →
        </span>
      </div>
    ),

    // 7. Top Ingredients to Prepare
    ingredients: (
      <div style={{ padding: "4px 0", fontSize: "13px", lineHeight: "1.6" }}>
        This is your quick shopping list for tomorrow.
        <br />
        <br />
        We calculated this by looking at your predicted menu sales and how much
        of each ingredient goes into every dish.
        <br />
        <br />
        <strong style={{ color: "#34d399" }}>
          💡 A little extra buffer
        </strong>{" "}
        has been added to cover unexpected orders or staff meals (you can adjust
        this buffer in Settings).
        <br />
        <br />
        <strong style={{ color: "#fbbf24" }}>Tip:</strong> Check your current
        supplies before heading to the market.
        <br />
        <br />
        <span
          style={{
            color: "#60a5fa",
            cursor: "pointer",
            display: "block",
            textAlign: "center",
            paddingTop: "8px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Click to view full ingredient demand breakdown in Analytics →
        </span>
      </div>
    ),
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
          {/* 1. Predicted Sales Card */}
          <div className="metric-card border-red">
            <div className="card-header">
              <h3 className="card-title">Predicted Sales Today</h3>
              <Tippy
                content={tooltips.sales}
                placement="top"
                animation="scale"
                duration={200}
                theme="dark"
                arrow={true}
                delay={[100, 0]}
                maxWidth={380}
                interactive={true}
                trigger="mouseenter focus click"
              >
                <span className="icon-wrapper">
                  <FaInfoCircle className="card-info" />
                </span>
              </Tippy>
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

          {/* 2. Actual Sales Card */}
          <div className="metric-card border-yellow">
            <div className="card-header">
              <h3 className="card-title">Actual Sales Yesterday</h3>
              <Tippy
                content={tooltips.actual}
                placement="top"
                animation="scale"
                duration={200}
                theme="dark"
                arrow={true}
                delay={[100, 0]}
                maxWidth={380}
                interactive={true}
                trigger="mouseenter focus click"
              >
                <span className="icon-wrapper">
                  <FaInfoCircle className="card-info" />
                </span>
              </Tippy>
            </div>
            <div className="metric-value-group">
              <span className="metric-value">₱ 50,000</span>
              <div className="badge-warning">
                
              </div>
            </div>
            <p className="metric-subtext">83% of monthly target met</p>
          </div>

          {/* 3. Forecast Accuracy Card */}
          <div className="metric-card border-green">
            <div className="card-header">
              <h3 className="card-title">Forecast Accuracy</h3>
              <Tippy
                content={tooltips.accuracy}
                placement="top"
                animation="scale"
                duration={200}
                theme="dark"
                arrow={true}
                delay={[100, 0]}
                maxWidth={380}
                interactive={true}
                trigger="mouseenter focus click"
              >
                <span className="icon-wrapper">
                  <FaInfoCircle className="card-info" />
                </span>
              </Tippy>
            </div>
            <div className="metric-value-group">
              <span className="metric-value text-green">92%</span>
              <div className="badge-success">
                <FaArrowUp className="badge-icon" />
                +2%
              </div>
            </div>
            <p className="metric-subtext small">
              Date: 2025/11/03 - 2025/11/16
            </p>
          </div>

          {/* 4. Ingredient Preparation Alert */}
          <div className="metric-card border-red-dark">
            <div className="card-header">
              <h3 className="card-title">Ingredient Preparation Alert</h3>
              <Tippy
                content={tooltips.stock}
                placement="top"
                animation="scale"
                duration={200}
                theme="dark"
                arrow={true}
                delay={[100, 0]}
                maxWidth={380}
                interactive={true}
                trigger="mouseenter focus click"
              >
                <span className="icon-wrapper">
                  <FaInfoCircle className="card-info" />
                </span>
              </Tippy>
            </div>
            <div className="metric-value-group">
              <span className="metric-value text-red">12</span>
              <div className="badge-danger">
               
              </div>
            </div>
            <p className="metric-subtext">items need preparation</p>
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
                  <Tippy
                    content={tooltips.chart}
                    placement="right"
                    animation="scale"
                    duration={200}
                    theme="dark"
                    arrow={true}
                    delay={[100, 0]}
                    maxWidth={350}
                    interactive={true}
                    trigger="mouseenter focus click"
                  >
                    <span className="chart-info-wrapper">
                      <FaQuestionCircle className="chart-info-icon" />
                    </span>
                  </Tippy>
                </h2>
                <p className="chart-description">
                  Actual Sales vs. Forecasted Sales vs. Future Forecast - A
                  quick visual of how your sales are trending.
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
                <svg
                  className="chart-svg"
                  preserveAspectRatio="none"
                  viewBox="0 0 1000 300"
                >
                  <g stroke="#f0f0f0" strokeWidth="1">
                    <line x1="50" x2="50" y1="0" y2="280" />
                    <line x1="50" x2="950" y1="280" y2="280" />
                    <line x1="50" x2="950" y1="230" y2="230" />
                    <line x1="50" x2="950" y1="180" y2="180" />
                    <line x1="50" x2="950" y1="130" y2="130" />
                    <line x1="50" x2="950" y1="80" y2="80" />
                    <line x1="50" x2="950" y1="30" y2="30" />
                  </g>

                  <path
                    d="M50 240 L200 200 L350 170 L500 130 L650 90 L800 60 L950 40"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="240" fill="#22c55e" r="4" />
                  <circle cx="200" cy="200" fill="#22c55e" r="4" />
                  <circle cx="350" cy="170" fill="#22c55e" r="4" />
                  <circle cx="500" cy="130" fill="#22c55e" r="4" />
                  <circle cx="650" cy="90" fill="#22c55e" r="4" />
                  <circle cx="800" cy="60" fill="#22c55e" r="4" />
                  <circle cx="950" cy="40" fill="#22c55e" r="4" />

                  <path
                    d="M50 260 L200 230 L350 190 L500 150 L650 110 L800 70 L950 30"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="260" fill="#60a5fa" r="4" />
                  <circle cx="200" cy="230" fill="#60a5fa" r="4" />
                  <circle cx="350" cy="190" fill="#60a5fa" r="4" />
                  <circle cx="500" cy="150" fill="#60a5fa" r="4" />
                  <circle cx="650" cy="110" fill="#60a5fa" r="4" />
                  <circle cx="800" cy="70" fill="#60a5fa" r="4" />
                  <circle cx="950" cy="30" fill="#60a5fa" r="4" />

                  <path
                    d="M50 270 L200 250 L350 220 L500 190 L650 170 L800 130 L950 100"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="270" fill="#1e40af" r="4" />
                  <circle cx="200" cy="250" fill="#1e40af" r="4" />
                  <circle cx="350" cy="220" fill="#1e40af" r="4" />
                  <circle cx="500" cy="190" fill="#1e40af" r="4" />
                  <circle cx="650" cy="170" fill="#1e40af" r="4" />
                  <circle cx="800" cy="130" fill="#1e40af" r="4" />
                  <circle cx="950" cy="100" fill="#1e40af" r="4" />
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
            </div>
          </div>

          <div className="right-panel">
            {/* Top Best Sellers */}
            <div className="placeholder-card">
              <div className="placeholder-header">
                <h3 className="placeholder-title">Top Best Sellers</h3>
                <Tippy
                  content={tooltips.bestSellers}
                  placement="top"
                  animation="scale"
                  duration={200}
                  theme="dark"
                  arrow={true}
                  delay={[100, 0]}
                  maxWidth={380}
                  interactive={true}
                  trigger="mouseenter focus click"
                >
                  <span className="icon-wrapper">
                    <FaInfoCircle className="card-info" />
                  </span>
                </Tippy>
              </div>
              <div className="scrollable-content">
                <div className="best-seller-item">
                  <span className="product-name">Poppers Series</span>
                  <div className="product-stats">
                    <span className="product-sales">245 sold</span>
                    <span className="product-ratio ratio-high">1.8x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">Cheesy Spicy Tocino</span>
                  <div className="product-stats">
                    <span className="product-sales">189 sold</span>
                    <span className="product-ratio ratio-high">1.4x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">OG Tapsilog</span>
                  <div className="product-stats">
                    <span className="product-sales">156 sold</span>
                    <span className="product-ratio ratio-medium">1.1x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">Breaded Porkchop</span>
                  <div className="product-stats">
                    <span className="product-sales">143 sold</span>
                    <span className="product-ratio ratio-medium">1.0x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">Chicken Sriracha</span>
                  <div className="product-stats">
                    <span className="product-sales">134 sold</span>
                    <span className="product-ratio ratio-medium">0.9x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">Lechon Kawali</span>
                  <div className="product-stats">
                    <span className="product-sales">112 sold</span>
                    <span className="product-ratio ratio-medium">0.8x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">Sizzling Sisig</span>
                  <div className="product-stats">
                    <span className="product-sales">98 sold</span>
                    <span className="product-ratio ratio-low">0.7x</span>
                  </div>
                </div>
                <div className="best-seller-item">
                  <span className="product-name">Herb Chicken</span>
                  <div className="product-stats">
                    <span className="product-sales">87 sold</span>
                    <span className="product-ratio ratio-low">0.6x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Ingredients to Prepare */}
            <div className="placeholder-card">
              <div className="placeholder-header">
                <h3 className="placeholder-title">
                  Top Ingredients to Prepare
                </h3>
                <Tippy
                  content={tooltips.ingredients}
                  placement="top"
                  animation="scale"
                  duration={200}
                  theme="dark"
                  arrow={true}
                  delay={[100, 0]}
                  maxWidth={380}
                  interactive={true}
                  trigger="mouseenter focus click"
                >
                  <span className="icon-wrapper">
                    <FaInfoCircle className="card-info" />
                  </span>
                </Tippy>
              </div>
              <div className="scrollable-content">
                <div className="ingredient-item">
                  <span className="ingredient-name">Beef Patty</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">5.2 kg</span>
                    <span className="ingredient-status urgent">Urgent</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Pork Belly</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">4.8 kg</span>
                    <span className="ingredient-status urgent">Urgent</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Chicken Breast</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">3.5 kg</span>
                    <span className="ingredient-status warning">Low</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Rice</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">3.2 kg</span>
                    <span className="ingredient-status warning">Low</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Cheese</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">2.8 kg</span>
                    <span className="ingredient-status warning">Low</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Cabbage</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">2.1 kg</span>
                    <span className="ingredient-status ok">OK</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Eggs</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">1.8 kg</span>
                    <span className="ingredient-status ok">OK</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Tomatoes</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">1.2 kg</span>
                    <span className="ingredient-status ok">OK</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Garlic</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">0.8 kg</span>
                    <span className="ingredient-status ok">OK</span>
                  </div>
                </div>
                <div className="ingredient-item">
                  <span className="ingredient-name">Onions</span>
                  <div className="ingredient-stats">
                    <span className="ingredient-qty">0.6 kg</span>
                    <span className="ingredient-status ok">OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
 
    </div>
  );
};

export default Dashboard;
