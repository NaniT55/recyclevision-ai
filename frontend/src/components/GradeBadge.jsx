import "./styles/global.css";

export default function GradeBadge({ grade = "A" }) {
  return (
    <div className={`grade-badge grade-${grade}`}>
      <span className="grade-label">
        Batch Grade
      </span>

      <h2>{grade}</h2>

      <p>
        {grade === "A" &&
          "High PET purity with minimal contamination"}

        {grade === "B" &&
          "Good recyclable quality with low contamination"}

        {grade === "C" &&
          "Moderate recyclable quality with mixed materials"}

        {grade === "D" &&
          "Low recyclable value with high contamination"}
      </p>
    </div>
  );
}