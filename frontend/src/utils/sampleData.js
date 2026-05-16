// SAMPLE ANALYSIS DATA

export const sampleAnalysisData = {
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
    "Strong recyclable material quality",
  ],

  processing_recommendation:
    "Proceed with standard PET recycling process.",
};

// SAMPLE REPORTS

export const sampleReports = [
  {
    id: "BATCH-1001",

    date: "2026-05-16",

    bottle_count: 148,

    pet_percentage: 84,

    contamination_risk: "low",

    batch_grade: "A",

    estimated_value_per_kg: 0.32,
  },

  {
    id: "BATCH-1002",

    date: "2026-05-15",

    bottle_count: 96,

    pet_percentage: 71,

    contamination_risk: "medium",

    batch_grade: "B",

    estimated_value_per_kg: 0.24,
  },

  {
    id: "BATCH-1003",

    date: "2026-05-14",

    bottle_count: 73,

    pet_percentage: 46,

    contamination_risk: "high",

    batch_grade: "C",

    estimated_value_per_kg: 0.12,
  },
];

// SAMPLE KPI DATA

export const sampleKpis = [
  {
    title: "Bottle Count",

    value: 148,

    subtitle: "Detected containers",

    icon: "♻",

    color: "green",
  },

  {
    title: "PET Percentage",

    value: "84%",

    subtitle: "Estimated PET material",

    icon: "🧪",

    color: "blue",
  },

  {
    title: "Quality Score",

    value: 91,

    subtitle: "Recycling quality index",

    icon: "📈",

    color: "yellow",
  },

  {
    title: "Confidence",

    value: "96%",

    subtitle: "AI prediction confidence",

    icon: "🤖",

    color: "purple",
  },
];

// SAMPLE OBSERVATIONS

export const sampleObservations = [
  "High PET purity detected",

  "Minimal contamination observed",

  "Good bottle separation",

  "Clear plastic dominates the batch",

  "Batch suitable for standard recycling pipeline",
];

// SAMPLE LOADING STEPS

export const loadingSteps = [
  "Uploading image...",

  "Processing visual data...",

  "Detecting bottle materials...",

  "Analyzing contamination...",

  "Estimating recycling value...",

  "Generating final report...",
];

// SAMPLE CHART DATA

export const sampleChartData = {
  pet: 84,

  nonPet: 16,

  colors: {
    clear: 58,
    green: 18,
    blue: 12,
    amber: 7,
    other: 5,
  },
};