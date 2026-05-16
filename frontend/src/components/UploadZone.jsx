import { useRef, useState } from "react";
import "./styles/global.css";

export default function UploadZone({
  onFileSelect,
}) {
  const inputRef = useRef(null);

  const [dragging, setDragging] =
    useState(false);

  const [preview, setPreview] =
    useState(null);

  // FILE HANDLER
  const handleFile = (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    onFileSelect(file);
  };

  // INPUT CHANGE
  const handleInputChange = (e) => {
    const file = e.target.files[0];

    handleFile(file);
  };

  // DRAG EVENTS
  const handleDragOver = (e) => {
    e.preventDefault();

    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files[0];

    handleFile(file);
  };

  return (
    <div className="upload-wrapper">
      {/* DROP ZONE */}
      <div
        className={
          dragging
            ? "upload-zone dragging"
            : "upload-zone"
        }
        onClick={() =>
          inputRef.current.click()
        }
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* HIDDEN INPUT */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          hidden
          onChange={handleInputChange}
        />

        {/* CONTENT */}
        <div className="upload-icon">
          📤
        </div>

        <h2>
          Drag & Drop Recycling Images
        </h2>

        <p>
          Upload bottle batch images for
          AI-powered recycling analysis
        </p>

        <button className="browse-btn">
          Browse Files
        </button>

        <span className="file-info">
          Supports JPG, PNG, WEBP
        </span>
      </div>

      {/* PREVIEW */}
      {preview && (
        <div className="preview-card">
          <h3>Selected Image</h3>

          <img
            src={preview}
            alt="preview"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
}