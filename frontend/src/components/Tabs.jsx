import "./styles/global.css";

export default function Tabs({
  tabs = [],
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={
            activeTab === tab.id
              ? "tab-button active-tab"
              : "tab-button"
          }
          onClick={() => setActiveTab(tab.id)}
        >
          {/* ICON */}
          {tab.icon && (
            <span className="tab-icon">
              {tab.icon}
            </span>
          )}

          {/* LABEL */}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}