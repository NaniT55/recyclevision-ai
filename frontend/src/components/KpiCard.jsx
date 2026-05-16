import "./styles/global.css";

export default function KpiCard({
  title,
  value,
  subtitle,
  icon,
  color = "green",
}) {
  return (
    <div className={`kpi-card ${color}`}>
      {/* TOP */}
      <div className="kpi-top">
        <div className="kpi-icon">
          {icon}
        </div>

        <div className="kpi-title">
          {title}
        </div>
      </div>

      {/* VALUE */}
      <div className="kpi-value">
        {value}
      </div>

      {/* SUBTITLE */}
      <div className="kpi-subtitle">
        {subtitle}
      </div>
    </div>
  );
}