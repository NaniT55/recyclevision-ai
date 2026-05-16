import CompositionChart from "./CompositionChart";
import "./styles/global.css";

export default function Dashboard({ result }) {
  if (!result) return null;

  return (
    <div className="dashboard-page">
      {/* TOP KPI SECTION */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span>Total Bottles</span>

          <h2>{result.bottle_count}</h2>

          <p>Detected containers</p>
        </div>

        <div className="dashboard-card">
          <span>PET Composition</span>

          <h2>{result.pet_percentage}%</h2>

          <p>Estimated PET material</p>
        </div>

        <div className="dashboard-card">
          <span>Quality Score</span>

          <h2>{result.quality_score}</h2>

          <p>Material quality index</p>
        </div>

        <div className="dashboard-card">
          <span>Confidence</span>

          <h2>{result.confidence_score}%</h2>

          <p>AI prediction confidence</p>
        </div>
      </div>

      {/* MAIN ANALYTICS */}
      <div className="analytics-grid">
        {/* LEFT SIDE */}
        <div className="analytics-left">
          {/* COMPOSITION CHART */}
          <CompositionChart
            petPercentage={result.pet_percentage}
            nonPetPercentage={result.non_pet_percentage}
            colorDistribution={result.color_distribution}
          />

          {/* OBSERVATIONS */}
          <div className="analytics-card">
            <h3>📊 Key Observations</h3>

            <ul className="observations-list">
              {result.key_observations?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* RECOMMENDATION */}
          <div className="analytics-card">
            <h3>⚙ Processing Recommendation</h3>

            <p>{result.processing_recommendation}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="analytics-right">
          {/* GRADE */}
          <div className="analytics-card grade-card">
            <h3>🏆 Batch Grade</h3>

            <div className={`grade-box grade-${result.batch_grade}`}>
              {result.batch_grade}
            </div>

            <p>
              Based on PET composition, contamination level,
              and estimated recycling quality.
            </p>
          </div>

          {/* CONTAMINATION */}
          <div className="analytics-card">
            <h3>⚠ Contamination Risk</h3>

            <div
              className={`risk-badge ${result.contamination_risk}`}
            >
              {result.contamination_risk}
            </div>

            <p>{result.contamination_details}</p>
          </div>

          {/* HUMAN REVIEW */}
          <div className="analytics-card">
            <h3>👤 Human Review</h3>

            <div
              className={
                result.human_review_flag
                  ? "review-yes"
                  : "review-no"
              }
            >
              {result.human_review_flag
                ? "Required"
                : "Not Required"}
            </div>

            <p>
              {result.human_review_reason ||
                "No manual review required."}
            </p>
          </div>

          {/* VALUE */}
          <div className="analytics-card value-card">
            <h3>💰 Estimated Value</h3>

            <div className="value-price">
              ${result.estimated_value_per_kg}
              <span>/kg</span>
            </div>

            <div className="value-range">
              <div>
                <span>Low</span>
                <h4>
                  ${result.estimated_value_range?.low}
                </h4>
              </div>

              <div>
                <span>High</span>
                <h4>
                  ${result.estimated_value_range?.high}
                </h4>
              </div>
            </div>
          </div>

          {/* RAW JSON */}
          <div className="analytics-card">
            <h3>🧾 Raw JSON Output</h3>

            <pre>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}