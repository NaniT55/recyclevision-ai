import { Link, useLocation } from "react-router-dom";
import "../styles/global.css";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      {/* LOGO */}
      <div className="logo-section">
        <div className="logo-icon">
          ♻
        </div>

        <div>
          <h2>RecycleVision</h2>

          <p>AI Recycling Intelligence</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="nav-links">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Home
        </Link>

        <Link
          to="/analysis"
          className={
            location.pathname === "/analysis"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Analysis
        </Link>

        <Link
          to="/reports"
          className={
            location.pathname === "/reports"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Reports
        </Link>
      </nav>

      {/* STATUS */}
      <div className="status-box">
        <span className="status-dot"></span>

        <span>System Online</span>
      </div>
    </header>
  );
}