import "./styles/global.css";

export default function RiskBadge({
  risk = "low",
  details = "",
}) {
  const safeRisk = risk.toLowerCase();

  const getIcon = () => {
    if (safeRisk === "low") return "🟢";
    if (safeRisk === "medium") return "🟡";

    return "🔴";
  };

  const getTitle = () => {
    if (safeRisk === "low")
      return "Low Contamination Risk";

    if (safeRisk === "medium")
      return "Moderate Contamination Risk";

    return "High Contamination Risk";
  };

  return (
    <div className={`risk-card ${safeRisk}`}>
      {/* HEADER */}
      <div className="risk-header">
        <div className="risk-icon">
          {getIcon()}
        </div>

        <div>
          <h2>{getTitle()}</h2>

          <span className="risk-level">
            {safeRisk}
          </span>
        </div>
      </div>

      {/* DETAILS */}
      <p className="risk-details">
        {details ||
          "No contamination details available."}
      </p>
    </div>
  );
}