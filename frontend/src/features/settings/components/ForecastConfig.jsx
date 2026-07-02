
import React, { useState } from 'react'
import './ForecastConfig.css'

function ForecastConfig() {
  const [value, setValue] = useState(15)

  return (
    <section className="fc-root">
      <div className="fc-inner">
        <div className="fc-card fc-left">
          <h2 className="fc-title">Safety Buffer Percentage</h2>
          <div className="fc-desc-card">
            <strong>Description:</strong> Additional allowance for forecasted ingredient demand.
          </div>

          <div className="fc-control-card">
            <div className="fc-slider-row">
              <div className="fc-percent">[{value}%]</div>
              <input
                className="fc-slider"
                type="range"
                min="0"
                max="50"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
              <div className="fc-scale">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
              </div>
            </div>
          </div>

          <button className="fc-save">SAVE CONFIGURATION</button>
        </div>

        <aside className="fc-card fc-right">
          <h3 className="fc-right-title">This safety buffer covers:</h3>
          <ul className="fc-bullets">
            <li>Unexpected customer demand (walk-ins, spikes)</li>
            <li>Staff meals not recorded in your POS system</li>
          </ul>

          <p className="fc-note"><strong>Higher buffer</strong> = Less risk of stockout, more potential waste</p>
          <p className="fc-note"><strong>Lower buffer</strong> = Less waste, higher risk of stockout</p>

          <p className="fc-meta"><strong>Default:</strong> 15%</p>
          <p className="fc-meta"><strong>Recommended:</strong> 10–20%</p>
        </aside>
      </div>
    </section>
  )
}

export default ForecastConfig