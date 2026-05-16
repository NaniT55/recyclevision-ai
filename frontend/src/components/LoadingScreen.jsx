import "./styles/global.css";

export default function LoadingScreen({
  message = "Analyzing recycling batch...",
}) {
  return (
    <div className="loading-screen">
      {/* LOADER */}
      <div className="loader-wrapper">
        <div className="spinner"></div>

        <div className="pulse-ring"></div>
      </div>

      {/* TEXT */}
      <h2>AI Analysis In Progress</h2>

      <p>{message}</p>

      {/* STEPS */}
      <div className="loading-steps">
        <div className="step active">
          <span>✓</span>
          Upload Processing
        </div>

        <div className="step active">
          <span>✓</span>
          Image Understanding
        </div>

        <div className="step current">
          <span>⟳</span>
          Material Classification
        </div>

        <div className="step">
          <span>○</span>
          Value Estimation
        </div>
      </div>
    </div>
  );
}