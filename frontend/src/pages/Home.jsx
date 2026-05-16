import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/global.css";

export default function Home() {

  const navigate = useNavigate();

  const [
    showArchitecture,
    setShowArchitecture,
  ] = useState(false);

  return (

    <div className="home">

      {/* HERO SECTION */}

      <section className="hero-section">

        {/* LEFT CONTENT */}

        <div className="hero-left">

          <div className="hero-badge">
            ♻ AI-Powered Recycling Intelligence
          </div>

          <h1 className="hero-title">

            Smart Recycling
            <br />

            <span>
              Vision System
            </span>

          </h1>

          <p className="hero-description">

            Analyze plastic bottle
            batches using AI-powered
            computer vision.

            Detect PET composition,
            contamination risk,
            quality grading,
            and estimated recycling
            value in seconds.

          </p>

          {/* BUTTONS */}

          <div className="hero-buttons">

            <button
              className="primary-btn"

              onClick={() =>
                navigate("/analysis")
              }
            >
              Start Analysis →
            </button>

            <button
              className="secondary-btn"

              onClick={() =>
                setShowArchitecture(
                  true
                )
              }
            >
              View Architecture
            </button>

          </div>

        </div>

        {/* RIGHT PREVIEW */}

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="preview-header">

              <div>

                <h3>
                  Live Batch Report
                </h3>

                <p>
                  AI-generated analysis
                </p>

              </div>

              <div className="grade-badge">
                Grade A
              </div>

            </div>

            {/* METRICS */}

            <div className="metrics-grid">

              <div className="metric-card">

                <span>
                  Bottle Count
                </span>

                <h2>
                  148
                </h2>

              </div>

              <div className="metric-card">

                <span>
                  PET Content
                </span>

                <h2>
                  84%
                </h2>

              </div>

              <div className="metric-card">

                <span>
                  Quality Score
                </span>

                <h2>
                  91
                </h2>

              </div>

              <div className="metric-card">

                <span>
                  Confidence
                </span>

                <h2>
                  96%
                </h2>

              </div>

            </div>

            {/* CONTAMINATION */}

            <div className="contamination-box">

              <h4>
                ⚠ Contamination Risk:
                Low
              </h4>

              <p>
                Minor label residue
                detected.

                Batch suitable for
                standard PET recycling
                pipeline.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features-section">

        <h2>
          Platform Features
        </h2>

        <div className="features-grid">

          <div className="feature-card">

            <h3>
              Bottle Detection
            </h3>

            <p>
              AI-powered image analysis
              for bottle identification
              and counting.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              PET Classification
            </h3>

            <p>
              Estimate PET vs Non-PET
              composition with
              confidence scoring.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Contamination Analysis
            </h3>

            <p>
              Detect contamination risk
              and generate human-review
              flags.
            </p>

          </div>

          <div className="feature-card">

            <h3>
              Batch Value Estimation
            </h3>

            <p>
              Predict recycling market
              value and processing
              grade.
            </p>

          </div>

        </div>

      </section>

      {/* ARCHITECTURE MODAL */}

      {showArchitecture && (

        <div
          className="architecture-modal"

          onClick={() =>
            setShowArchitecture(
              false
            )
          }
        >

          <div
            className="architecture-modal-content"

            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE BUTTON */}

            <button
              className="close-btn"

              onClick={() =>
                setShowArchitecture(
                  false
                )
              }
            >
              ✕
            </button>

            {/* IMAGE */}

            <img
              src="/architecture.png"

              alt="Architecture"

              className="architecture-popup-image"
            />

          </div>

        </div>
      )}

    </div>
  );
}
