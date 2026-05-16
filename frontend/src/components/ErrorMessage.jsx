import "./styles/global.css";

export default function ErrorMessage({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <div className="error-container">
      <div className="error-card">
        {/* ICON */}
        <div className="error-icon">
          ⚠
        </div>

        {/* TITLE */}
        <h2>Analysis Failed</h2>

        {/* MESSAGE */}
        <p>{message}</p>

        {/* ACTIONS */}
        <div className="error-actions">
          <button
            className="retry-btn"
            onClick={onRetry}
          >
            Retry Analysis
          </button>
        </div>
      </div>
    </div>
  );
}