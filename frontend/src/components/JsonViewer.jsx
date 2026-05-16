import { useState } from "react";
import "./styles/global.css";

export default function JsonViewer({ data }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const formattedJson = JSON.stringify(data, null, 2);

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (err) {
      console.error(err);
    }
  };

  const downloadJson = () => {
    const blob = new Blob(
      [formattedJson],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `recycling-report-${Date.now()}.json`;

    a.click();
  };

  return (
    <div className="json-viewer">
      {/* HEADER */}
      <div className="json-header">
        <div>
          <h2>🧾 JSON Output</h2>

          <p>
            Structured AI-generated recycling analysis
          </p>
        </div>

        {/* ACTIONS */}
        <div className="json-actions">
          <button
            className="copy-btn"
            onClick={copyJson}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            className="download-btn"
            onClick={downloadJson}
          >
            Download
          </button>
        </div>
      </div>

      {/* JSON DISPLAY */}
      <div className="json-container">
        <pre>{formattedJson}</pre>
      </div>
    </div>
  );
}