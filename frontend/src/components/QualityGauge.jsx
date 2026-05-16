import "./styles/global.css";

export default function QualityGauge({
  score = 0,
}) {
  // SCORE LIMIT
  const safeScore = Math.min(
    Math.max(score, 0),
    100
  );

  // DYNAMIC COLOR
  const getColor = () => {
    if (safeScore >= 80) return "#2ecc71";
    if (safeScore >= 60) return "#f1c40f";
    if (safeScore >= 40) return "#e67e22";

    return "#e74c3c";
  };

  const color = getColor();

  return (
    <div className="quality-gauge">
      {/* HEADER */}
      <div className="gauge-header">
        <h2>📈 Quality Score</h2>

        <p>
          AI-estimated recycling quality index
        </p>
      </div>

      {/* CIRCLE */}
      <div className="gauge-wrapper">
        <div
          className="gauge-circle"
          style={{
            background: `conic-gradient(
              ${color} ${safeScore * 3.6}deg,
              #1d2d1d ${safeScore * 3.6}deg
            )`,
          }}
        >
          <div className="gauge-inner">
            <h1 style={{ color }}>
              {safeScore}
            </h1>

            <span>/100</span>
          </div>
        </div>
      </div>

      {/* LABEL */}
      <div className="quality-label">
        {safeScore >= 80 &&
          "Excellent recyclable quality"}

        {safeScore >= 60 &&
          safeScore < 80 &&
          "Good recyclable quality"}

        {safeScore >= 40 &&
          safeScore < 60 &&
          "Moderate recyclable quality"}

        {safeScore < 40 &&
          "Poor recyclable quality"}
      </div>

      {/* SCALE */}
      <div className="quality-scale">
        <div className="scale-item green">
          Excellent
        </div>

        <div className="scale-item yellow">
          Good
        </div>

        <div className="scale-item orange">
          Moderate
        </div>

        <div className="scale-item red">
          Poor
        </div>
      </div>
    </div>
  );
}