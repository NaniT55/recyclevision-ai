import "./styles/global.css";

export default function CompositionChart({
  petPercentage,
  nonPetPercentage,
  colorDistribution,
}) {
  return (
    <div className="composition-chart">
      {/* HEADER */}
      <div className="chart-header">
        <h2>♻ Material Composition</h2>

        <p>PET vs Non-PET distribution and bottle color analysis</p>
      </div>

      {/* PET COMPOSITION */}
      <div className="chart-card">
        <h3>Material Breakdown</h3>

        <div className="progress-section">
          <div className="progress-label">
            <span>PET Bottles</span>
            <span>{petPercentage}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill pet"
              style={{ width: `${petPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span>Non-PET Bottles</span>
            <span>{nonPetPercentage}%</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill non-pet"
              style={{ width: `${nonPetPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* COLOR DISTRIBUTION */}
      <div className="chart-card">
        <h3>Color Distribution</h3>

        <div className="colors-grid">
          <div className="color-item">
            <div className="color-circle clear"></div>

            <div>
              <h4>Clear</h4>
              <p>{colorDistribution?.clear || 0}%</p>
            </div>
          </div>

          <div className="color-item">
            <div className="color-circle green"></div>

            <div>
              <h4>Green</h4>
              <p>{colorDistribution?.green || 0}%</p>
            </div>
          </div>

          <div className="color-item">
            <div className="color-circle blue"></div>

            <div>
              <h4>Blue</h4>
              <p>{colorDistribution?.blue || 0}%</p>
            </div>
          </div>

          <div className="color-item">
            <div className="color-circle amber"></div>

            <div>
              <h4>Brown/Amber</h4>
              <p>{colorDistribution?.brown_amber || 0}%</p>
            </div>
          </div>

          <div className="color-item">
            <div className="color-circle other"></div>

            <div>
              <h4>Other</h4>
              <p>{colorDistribution?.other || 0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* DONUT VISUAL */}
      <div className="chart-card">
        <h3>Composition Overview</h3>

        <div className="donut-container">
          <div
            className="donut-chart"
            style={{
              "--pet": petPercentage,
            }}
          >
            <div className="donut-inner">
              <h2>{petPercentage}%</h2>
              <span>PET</span>
            </div>
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-color pet"></div>
              <span>PET Material</span>
            </div>

            <div className="legend-item">
              <div className="legend-color non-pet"></div>
              <span>Non-PET Material</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
