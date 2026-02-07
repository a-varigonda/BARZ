import "./Home.css";

function Home() {
  // You can change these values to update the dashboard
  const saved = 342;
  const spent = 2158;
  const earned = 2500;
  const percentageSpent = 70;

  return (
    <div className="home-page">
      {/* Header with savings info */}
      <div className="dashboard-header">
        <h1 className="savings-title">+${saved} Saved This Month</h1>
        <p className="earnings-subtitle">
          ${spent.toLocaleString()} / ${earned.toLocaleString()} ({percentageSpent}% spent)
        </p>
      </div>

      {/* Main content area */}
      <div className="dashboard-content">
        {/* Circular Progress Chart */}
        <div className="progress-section">
          <div className="circular-progress">
            <svg className="progress-ring" width="400" height="400">
              {/* Background circle */}
              <circle
                className="progress-ring-bg"
                stroke="#e0e0e0"
                strokeWidth="40"
                fill="none"
                r="160"
                cx="200"
                cy="200"
              />
              {/* Progress circle */}
              <circle
                className="progress-ring-circle"
                stroke="#4ade80"
                strokeWidth="40"
                fill="none"
                r="160"
                cx="200"
                cy="200"
                strokeDasharray="1005.31"
                strokeDashoffset="301.59"
                transform="rotate(-90 200 200)"
              />
            </svg>
            {/* Center text */}
            <div className="progress-text">
              <div className="amount-spent">${spent.toLocaleString()}</div>
              <div className="spent-label">spent of</div>
              <div className="amount-earned">${earned.toLocaleString()}</div>
              <div className="earned-label">earned</div>
            </div>
          </div>
        </div>

        {/* Spending Categories */}
        <div className="categories-section">
          <div className="categories-card">
            <h2 className="categories-title">Spending Categories</h2>
            <div className="categories-list">
              <div className="category-item">
                <div className="category-bar housing"></div>
                <span className="category-label">Housing</span>
              </div>
              <div className="category-item">
                <div className="category-bar food"></div>
                <span className="category-label">Food</span>
              </div>
              <div className="category-item">
                <div className="category-bar utilities"></div>
                <span className="category-label">Utilities</span>
              </div>
              <div className="category-item">
                <div className="category-bar personal"></div>
                <span className="category-label">Personal Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;