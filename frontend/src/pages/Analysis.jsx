import { useState } from "react";
import "../styles/global.css";

import { analyzeImage } from "../services/groqApi";

export default function Analysis() {
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  // HANDLE IMAGE

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

    setError("");
  };

  // ANALYZE IMAGE

  const handleAnalyze = async () => {
    if (!image) {
      setError("Please upload an image");

      return;
    }

    try {
      setLoading(true);

      setError("");

      setResult(null);

      const response = await analyzeImage(image);

      setResult(response);
    } catch (err) {
      console.error(err);

      setError(err.message || "Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analysis-page">
      {/* HEADER */}

      <div className="analysis-header">
        <h1>♻ Recycling Batch Analysis</h1>

        <p>
          Upload recycling bottle images and generate AI-powered operational
          insights.
        </p>
      </div>

      {/* MAIN CONTAINER */}

      <div className="analysis-container">
        {/* LEFT PANEL */}

        <div className="upload-panel">
          <h2>Upload Batch Image</h2>

          {/* FILE INPUT */}

          <input type="file" accept="image/*" onChange={handleImage} />

          {/* ANALYZE BUTTON */}

          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Batch"}
          </button>

          {/* ERROR */}

          {error && (
            <div
              style={{
                marginTop: "16px",
                color: "#e74c3c",
                fontWeight: "600",
              }}
            >
              {error}
            </div>
          )}

          {/* IMAGE PREVIEW */}

          {preview && (
            <img src={preview} alt="preview" className="preview-image" />
          )}
        </div>

        {/* RIGHT PANEL */}

        <div className="results-panel">
          {/* LOADING */}

          {loading && (
            <div className="empty-state">
              <h2>🤖 AI Analysis Running...</h2>

              <p>AI is processing recycling image.</p>
            </div>
          )}

          {/* EMPTY */}

          {!loading && !result && (
            <div className="empty-state">
              <h2>No Analysis Yet</h2>

              <p>
                Upload an image and run AI analysis to view recycling insights.
              </p>
            </div>
          )}

          {/* RESULT */}

          {result && (
            <>
              {/* KPI GRID */}

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <span>Bottle Count</span>

                  <h2>{result.bottle_count}</h2>
                </div>

                <div className="dashboard-card">
                  <span>PET %</span>

                  <h2>{result?.pet_percentage || 0}%</h2>
                </div>

                <div className="dashboard-card">
                  <span>Non-PET %</span>

                  <h2>{result.non_pet_percentage}%</h2>
                </div>

                <div className="dashboard-card">
                  <span>Quality Score</span>

                  <h2>{result.quality_score}</h2>
                </div>

                <div className="dashboard-card">
                  <span>Confidence</span>

                  <h2>{result.confidence_score}%</h2>
                </div>

                <div className="dashboard-card">
                  <span>Grade</span>

                  <h2>{result.batch_grade}</h2>
                </div>
              </div>

              {/* CONTAMINATION */}

              <div
                className="analysis-card"
                style={{
                  marginTop: "24px",
                }}
              >
                <h3>⚠ Contamination Risk</h3>

                <div
                  className={`risk-badge ${result.contamination_risk}`}
                  style={{
                    marginTop: "14px",
                    marginBottom: "18px",
                  }}
                >
                  {result.contamination_risk}
                </div>

                <p>{result.contamination_details}</p>
              </div>

              {/* VALUE */}

              <div
                className="analysis-card"
                style={{
                  marginTop: "24px",
                }}
              >
                <h3>💰 Estimated Value</h3>

                <div
                  style={{
                    fontSize: "42px",
                    color: "#2ecc71",
                    fontWeight: "800",
                    marginTop: "20px",
                  }}
                >
                  ${result.estimated_value_per_kg}
                  /kg
                </div>
              </div>

              {/* OBSERVATIONS */}

              <div
                className="analysis-card"
                style={{
                  marginTop: "24px",
                }}
              >
                <h3>📊 Key Observations</h3>

                <ul
                  style={{
                    marginTop: "20px",
                    paddingLeft: "20px",
                    lineHeight: "2",
                  }}
                >
                  {result.key_observations?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* RECOMMENDATION */}

              <div
                className="analysis-card"
                style={{
                  marginTop: "24px",
                }}
              >
                <h3>🛠 Processing Recommendation</h3>

                <p
                  style={{
                    marginTop: "18px",
                    lineHeight: "1.8",
                    color: "#8ea58e",
                  }}
                >
                  {result.processing_recommendation}
                </p>
              </div>

              {/* JSON */}

              <div
                className="analysis-card"
                style={{
                  marginTop: "24px",
                }}
              >
                <h3>🧾 JSON Output</h3>

                <pre
                  style={{
                    marginTop: "20px",
                  }}
                >
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
