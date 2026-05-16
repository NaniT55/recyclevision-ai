// APP INFORMATION
export const APP_NAME = "RecycleVision";

export const APP_DESCRIPTION =
  "AI-powered recycling intelligence platform for analyzing plastic bottle batches.";

// API
export const GROQ_API_URL =
  "https://api.groq.com/openai/v1/chat/completions";

export const GROQ_MODEL =
  "meta-llama/llama-4-scout-17b-16e-instruct";

// SUPPORTED FILE TYPES
export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

// MAX FILE SIZE
export const MAX_FILE_SIZE =
  10 * 1024 * 1024; // 10MB

// QUALITY LABELS
export const QUALITY_LABELS = {
  excellent: "Excellent recyclable quality",
  good: "Good recyclable quality",
  moderate: "Moderate recyclable quality",
  poor: "Poor recyclable quality",
};

// CONTAMINATION RISK COLORS
export const RISK_COLORS = {
  low: "#2ecc71",
  medium: "#f1c40f",
  high: "#e74c3c",
};

// GRADE COLORS
export const GRADE_COLORS = {
  A: "#2ecc71",
  B: "#f1c40f",
  C: "#e67e22",
  D: "#e74c3c",
};

// SAMPLE DATA
export const SAMPLE_RESULT = {
  bottle_count: 148,

  pet_percentage: 84,

  non_pet_percentage: 16,

  color_distribution: {
    clear: 58,
    green: 18,
    blue: 12,
    brown_amber: 7,
    other: 5,
  },

  quality_score: 91,

  contamination_risk: "low",

  contamination_details:
    "Minor label residue detected. Batch suitable for standard PET recycling pipeline.",

  confidence_score: 96,

  human_review_flag: false,

  human_review_reason: "",

  batch_grade: "A",

  estimated_value_per_kg: 0.32,

  estimated_value_range: {
    low: 0.28,
    high: 0.35,
  },

  key_observations: [
    "High PET purity detected",
    "Minimal contamination observed",
    "Clear bottles dominate the batch",
    "Good recyclable quality",
  ],

  processing_recommendation:
    "Proceed with standard PET recycling process.",
};

// TAB OPTIONS
export const DASHBOARD_TABS = [
  {
    id: "overview",
    label: "Overview",
    icon: "📊",
  },

  {
    id: "composition",
    label: "Composition",
    icon: "♻",
  },

  {
    id: "quality",
    label: "Quality",
    icon: "📈",
  },

  {
    id: "reports",
    label: "Reports",
    icon: "📄",
  },
];

// LOADING MESSAGES
export const LOADING_MESSAGES = [
  "Analyzing recycling materials...",
  "Detecting PET composition...",
  "Estimating contamination risk...",
  "Generating quality metrics...",
  "Computing batch value...",
];

// EXPORT TYPES
export const EXPORT_FORMATS = [
  "json",
  "csv",
];

// ROUTES
export const ROUTES = {
  HOME: "/",
  ANALYSIS: "/analysis",
  REPORTS: "/reports",
};