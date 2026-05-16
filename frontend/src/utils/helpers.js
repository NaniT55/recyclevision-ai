/**
 * Format percentage values
 */
export function formatPercentage(value) {
  if (value === undefined || value === null) {
    return "0%";
  }

  return `${Number(value).toFixed(0)}%`;
}

/**
 * Format currency values
 */
export function formatCurrency(value) {
  if (!value && value !== 0) {
    return "$0.00";
  }

  return `$${Number(value).toFixed(2)}`;
}

/**
 * Get quality label from score
 */
export function getQualityLabel(score) {
  if (score >= 80) {
    return "Excellent";
  }

  if (score >= 60) {
    return "Good";
  }

  if (score >= 40) {
    return "Moderate";
  }

  return "Poor";
}

/**
 * Get contamination color
 */
export function getRiskColor(risk) {
  switch (risk?.toLowerCase()) {
    case "low":
      return "#2ecc71";

    case "medium":
      return "#f1c40f";

    case "high":
      return "#e74c3c";

    default:
      return "#95a5a6";
  }
}

/**
 * Get grade color
 */
export function getGradeColor(grade) {
  switch (grade) {
    case "A":
      return "#2ecc71";

    case "B":
      return "#f1c40f";

    case "C":
      return "#e67e22";

    case "D":
      return "#e74c3c";

    default:
      return "#95a5a6";
  }
}

/**
 * Validate uploaded image
 */
export function validateImage(file) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const maxSize =
    10 * 1024 * 1024; // 10MB

  if (!file) {
    return {
      valid: false,
      message: "No file selected",
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message:
        "Only JPG, PNG, and WEBP images are supported",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message:
        "File size exceeds 10MB limit",
    };
  }

  return {
    valid: true,
    message: "Valid file",
  };
}

/**
 * Convert file size
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

/**
 * Download file utility
 */
export function downloadFile(
  content,
  filename,
  type
) {
  const blob = new Blob(
    [content],
    { type }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

/**
 * Generate random batch ID
 */
export function generateBatchId() {
  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `BATCH-${random}`;
}

/**
 * Format current date
 */
export function formatDate(date = new Date()) {
  return date.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

/**
 * Simulate loading delay
 */
export function delay(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}