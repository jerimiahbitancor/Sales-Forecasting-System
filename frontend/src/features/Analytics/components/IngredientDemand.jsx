// components/IngredientDemand.jsx
import { useState } from "react";
import { FiChevronDown, FiSearch, FiCalendar, FiDownload } from "react-icons/fi";
import DatePicker from "./shared/DatePicker.jsx";
import InfoBanner from "./shared/InfoBanner.jsx";
import "./shared/InfoBanner.css";
import "./IngredientDemand.css";

// ---------------------------------------------------------------------
// Mock data — replace with the real ingredient-demand endpoint response.
// `days` holds one { qty, level } entry per weekday; `level` drives the
// cell color (normal / above / high) the same way the wireframe's
// heatmap does. `buyList` backs the "Base Qty Needed / + Buffer / Total
// to Buy" table, which is exactly the
//   Ingredient Needed = Σ(Forecasted Servings × Recipe Qty per Serving)
//                        × (1 + Safety Buffer%) + Staff Consumption Buffer
// formula from the capstone's ingredient-demand formula, applied per row.
// ---------------------------------------------------------------------
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const demandGrid = [
  { ingredient: "Breaded Tonkatsu", values: [18.2, 18.2, 18.2, 18.2, 18.2, 18.2, 18.2], highDay: 4 },
  { ingredient: "Poppers & Rice", values: [3.9, 3.9, 3.9, 3.9, 3.9, 3.9, 3.9], highDay: 4 },
  { ingredient: "Rice", values: [1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4], highDay: 4 },
  { ingredient: "Chicken", values: [0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7], highDay: 4 },
  { ingredient: "Soy Sauce", values: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], highDay: 4 },
];

const buyList = [
  { ingredient: "Pork", linkedDishes: "Breaded Tonkatsu, Coated Tonkatsu, ...", baseQty: 3.68, buffer: 0.55, total: 4, unit: "kg" },
];

const ingredientList = [
  { name: "Rice", usedIn: "All dishes", qty: "21.4", unit: "kg" },
  { name: "Pork", usedIn: "Tonkatsu Series", qty: "4.73", unit: "kg" },
  { name: "Chicken", usedIn: "Poppers Series", qty: "1.75", unit: "kg" },
  { name: "Tomatoes", usedIn: "Tinola", qty: "0.87", unit: "kg" },
  { name: "Soy Sauce", usedIn: "Adobo, Sauces", qty: "0.66", unit: "L" },
];

// values relative to their own row: darker/warmer cell for the flagged
// high-demand day, matching the wireframe's "Darker = more than usual"
function cellLevel(dayIndex, highDay) {
  return dayIndex === highDay ? "high" : dayIndex % 2 === 0 ? "above" : "normal";
}

function IngredientDemand() {
  const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);

  return (
    <>
      <div className="analytics-col-main">
        <section className="analytics-card">
          <h2 className="analytics-card-title">Estimated ingredients to prepare</h2>

          <div className="analytics-filter-row">
            <DatePicker value={selectedRange} onChange={setSelectedRange} mode="range" />
            <span className="filter-search">
              <FiSearch size={14} /> Search Product
            </span>
          </div>

          <p className="section-note">
            Ingredient demand — this week. Color shows demand level relative to each
            ingredient's typical amount. Darker = more than usual.
          </p>

          <table className="analytics-table heatmap-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Ingredient</th>
                {weekDays.map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demandGrid.map((row, i) => (
                <tr key={row.ingredient}>
                  <td>{i === 0 ? 1 : i === 1 ? 2 : "…"}</td>
                  <td>{i < 2 ? row.ingredient : ""}</td>
                  {row.values.map((v, di) => (
                    <td key={di} className={`heatmap-cell heatmap-cell--${cellLevel(di, row.highDay)}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="chart-legend">
            <span className="legend-item"><span className="legend-swatch legend-swatch--normal" /> Normal</span>
            <span className="legend-item"><span className="legend-swatch legend-swatch--abovenorm" /> Above Normal</span>
            <span className="legend-item"><span className="legend-swatch legend-swatch--highday" /> High Demand Day</span>
          </div>

          <InfoBanner variant="info">
            This shows what the system estimates you'll need based on tomorrow's predicted
            sales. Always check your actual fridge and stock before buying — the system
            does not know what you currently have on hand.
          </InfoBanner>

          <table className="analytics-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Ingredient</th>
                <th>Link Dishes</th>
                <th>Base Qty Needed</th>
                <th>+ Buffer</th>
                <th>Total to Buy</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {buyList.map((row, i) => (
                <tr key={row.ingredient}>
                  <td>{i + 1}</td>
                  <td>{row.ingredient}</td>
                  <td>{row.linkedDishes}</td>
                  <td>{row.baseQty}</td>
                  <td>+ {row.buffer}</td>
                  <td className="value--success">{row.total}</td>
                  <td>{row.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="calc-note">
            <p className="calc-note-title">How is this calculated?</p>
            <p className="calc-note-body">
              For each dish: forecast quantity × ingredient amount per serving. All results
              are added up across dishes that share an ingredient (like pork in both Adobo
              and Menudo), then a safety buffer is added. You can change the buffer
              percentage in Settings.
            </p>
          </div>
        </section>
      </div>

      <div className="analytics-col-side">
        <section className="analytics-card">
          <div className="ingredient-list-header">
            <h2 className="analytics-card-title">Ingredient List</h2>
            <button type="button" className="btn-export">
              <FiDownload size={14} /> Export List
            </button>
          </div>

          <p className="ingredient-list-caption">
            Estimated ingredients to prepare for
            <br />
            <strong>Tomorrow, June 25 (Wednesday)</strong>
          </p>

          <InfoBanner variant="info">
            Check your actual stock before buying — the system estimates what you'll need,
            not what you currently have.
          </InfoBanner>

          <ul className="ingredient-list">
            {ingredientList.map((item) => (
              <li key={item.name} className="ingredient-list-row">
                <div>
                  <p className="ingredient-list-name">{item.name}</p>
                  <p className="ingredient-list-used">Used in: {item.usedIn}</p>
                </div>
                <div className="ingredient-list-qty">
                  <span>{item.qty}</span>
                  <span className="ingredient-list-unit">{item.unit}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default IngredientDemand;