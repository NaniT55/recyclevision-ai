import { useEffect, useState } from "react";

import "../styles/global.css";

export default function Reports() {

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // LOAD REPORTS FROM LOCAL STORAGE

  useEffect(() => {

    try {

      const savedReports =
        JSON.parse(
          localStorage.getItem(
            "reports"
          )
        ) || [];

      setReports(savedReports);

    } catch (error) {

      console.error(
        "Failed to load reports",
        error
      );

    } finally {

      setLoading(false);
    }

  }, []);

  // DOWNLOAD REPORT

  const downloadReport = (
    report
  ) => {

    const blob = new Blob(

      [
        JSON.stringify(
          report,
          null,
          2
        ),
      ],

      {
        type:
        "application/json",
      }
    );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      `${report.batch_id}.json`;

    a.click();

    URL.revokeObjectURL(
      url
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

      {/* EMPTY STATE */}

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

      {/* REPORT TABLE */}

      {!loading &&
        reports.length > 0 && (

        <div className="reports-container">

          <table>

            <thead>

              <tr>

                <th>
                  Batch ID
                </th>

                <th>
                  Timestamp
                </th>

                <th>
                  Grade
                </th>

                <th>
                  Bottle Count
                </th>

                <th>
                  PET %
                </th>

                <th>
                  Download
                </th>

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
                        report.analysis_timestamp
                      ).toLocaleString()}

                    </td>

                    <td>

                      <div
                        className={`grade-badge grade-${report.batch_grade}`}
                      >

                        {report.batch_grade}

                      </div>

                    </td>

                    <td>
                      {report.bottle_count}
                    </td>

                    <td>
                      {report.pet_percentage}%
                    </td>

                    <td>

                      <button
                        className="download-btn"

                        onClick={() =>
                          downloadReport(
                            report
                          )
                        }
                      >
                        Download
                      </button>

                    </td>

                  </tr>
                )
              )}

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

            <p>
              Total Reports
            </p>

          </div>

          <div className="summary-card">

            <h2>
              AI
            </h2>

            <p>
              Groq Vision Analysis
            </p>

          </div>

          <div className="summary-card">

            <h2>
              JSON
            </h2>

            <p>
              Structured Reports
            </p>

          </div>

          <div className="summary-card">

            <h2>
              Local
            </h2>

            <p>
              Browser Stored Reports
            </p>

          </div>

        </div>
      )}

    </div>
  );
}