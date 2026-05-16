import { useEffect, useState } from "react";

import "../styles/global.css";

export default function Reports() {

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH REPORTS

  const fetchReports = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/reports"
      );

      const data =
        await response.json();

      setReports(data);

    } catch (error) {

      console.error(
        "Failed to fetch reports",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // LOAD REPORTS

  useEffect(() => {

    fetchReports();

  }, []);

  // DOWNLOAD REPORT

  const downloadReport = (
    batchId
  ) => {

    window.open(
      `http://127.0.0.1:8000/reports/${batchId}`,
      "_blank"
    );
  };

  return (

    <div className="reports-page">

      {/* HEADER */}

      <div className="reports-header">

        <h1>
          📄 Analysis Reports
        </h1>

        <p>
          View previously generated
          recycling intelligence reports
          and export structured JSON outputs.
        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="analysis-card">

          <h2>
            Loading reports...
          </h2>

        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        reports.length === 0 && (

        <div className="analysis-card">

          <h2>
            No Reports Found
          </h2>

          <p
            style={{
              marginTop: "12px",
              color: "#8ea58e",
            }}
          >
            Run analysis to generate reports.
          </p>

        </div>
      )}

      {/* REPORTS TABLE */}

      {!loading &&
        reports.length > 0 && (

        <div className="reports-container">

          <table>

            <thead>

              <tr>
                <th>Batch ID</th>
                <th>Timestamp</th>
                <th>Grade</th>
                <th>Download</th>
              </tr>

            </thead>

            <tbody>

              {reports.map(
                (report, index) => (

                <tr key={index}>

                  <td>
                    {report.batch_id}
                  </td>

                  <td>
                    {new Date(
                      report.timestamp
                    ).toLocaleString()}
                  </td>

                  <td>

                    <div
                      className={`grade-badge grade-${report.grade}`}
                    >
                      {report.grade}
                    </div>

                  </td>

                  <td>

                    <button
                      className="download-btn"
                      onClick={() =>
                        downloadReport(
                          report.batch_id
                        )
                      }
                    >
                      Download
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* SUMMARY */}

      {!loading &&
        reports.length > 0 && (

        <div className="summary-section">

          <div className="summary-card">

            <h2>
              {reports.length}
            </h2>

            <p>Total Reports</p>

          </div>

          <div className="summary-card">

            <h2>
              Active
            </h2>

            <p>Backend Connected</p>

          </div>

          <div className="summary-card">

            <h2>
              AI
            </h2>

            <p>Groq Vision Analysis</p>

          </div>

          <div className="summary-card">

            <h2>
              JSON
            </h2>

            <p>Structured Reports</p>

          </div>

        </div>
      )}

    </div>
  );
}