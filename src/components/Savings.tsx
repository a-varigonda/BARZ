import React from 'react';
import './Savings.css';

interface SavingsData {
  currentRate: number;
  lastMonthRate: number;
  yearlyAverage: number;
  recommendedRate: number;
}

const Savings: React.FC = () => {
  // Sample data - replace with actual data from props or state management
  const data: SavingsData = {
    currentRate: 21,
    lastMonthRate: 45,
    yearlyAverage: 13,
    recommendedRate: 17,
  };

  // Calculate percentage differences
  const vsLastMonth = ((data.currentRate - data.lastMonthRate) / data.lastMonthRate * 100).toFixed(0);
  const vsYearlyAverage = data.currentRate - data.yearlyAverage;
  const vsRecommended = data.currentRate - data.recommendedRate;

  return (
    <div className="savings-container">
      {/* Main Content */}
      <main className="main-content">
        <div className="cards-grid">
          {/* Primary Card - Projected Savings */}
          <div className="card card-primary">
            <div className="card-header">FEBRUARY 2026 PROJECTION</div>
            <div className="savings-rate">{data.currentRate}%</div>
            <div className="card-subtitle">Projected Savings Rate</div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${data.currentRate}%` }}
              ></div>
            </div>
            <div className="card-footer">Based on current spending patterns</div>
          </div>

          {/* VS Last Month Card */}
          <div className="card">
            <div className="card-header">VS. LAST MONTH</div>
            <div className="comparison-value negative">{vsLastMonth}%</div>
            <div className="comparison-details">
              <div className="detail-row">
                <span className="detail-label">Last Month:</span>
                <span className="detail-value">{data.lastMonthRate}%</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">This Month:</span>
                <span className="detail-value">{data.currentRate}%</span>
              </div>
            </div>
          </div>

          {/* VS Yearly Average Card */}
          <div className="card">
            <div className="card-header">VS. YEARLY AVERAGE</div>
            <div className="comparison-value positive">+{vsYearlyAverage}%</div>
            <div className="comparison-details">
              <div className="detail-row">
                <span className="detail-label">12-Month Avg:</span>
                <span className="detail-value">{data.yearlyAverage}%</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">This Month:</span>
                <span className="detail-value">{data.currentRate}%</span>
              </div>
            </div>
          </div>

          {/* VS Recommended Rate Card */}
          <div className="card">
            <div className="card-header">VS. RECOMMENDED RATE</div>
            <div className="comparison-value positive">+{vsRecommended}%</div>
            <div className="comparison-details">
              <div className="detail-row">
                <span className="detail-label">Recommended:</span>
                <span className="detail-value">{data.recommendedRate}%</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">This Month:</span>
                <span className="detail-value">{data.currentRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Savings;
