import { useState } from "react";
import "./Experiences.css";

interface ExperienceItem {
  id: number;
  name: string;
  estimatedCost: number;
}

function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [experienceName, setExperienceName] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");

  const handleSaveExperience = () => {
    if (!experienceName || !estimatedCost) {
      alert("Please fill in the experience name and estimated cost!");
      return;
    }

    const newExperience: ExperienceItem = {
      id: Date.now(),
      name: experienceName,
      estimatedCost: parseFloat(estimatedCost)
    };

    setExperiences([newExperience, ...experiences]);

    setExperienceName("");
    setEstimatedCost("");
  };

  const handleDeleteExperience = (id: number) => {
    setExperiences(experiences.filter((item) => item.id !== id));
  };

  const totalEstimated = experiences.reduce((sum, item) => sum + item.estimatedCost, 0);

  return (
    <div className="experiences-page-layout">
      {/* LEFT SIDE - FORM */}
      <div className="experience-form-container">
        <h2 className="section-title">Add New Experience</h2>

        <div className="experience-form-header">
          <input
            type="text"
            placeholder="What experience do you want to do?"
            className="experience-input-main"
            value={experienceName}
            onChange={(e) => setExperienceName(e.target.value)}
          />
        </div>

        <div className="experience-form-details">
          <div className="form-row">
            <label>Estimated Cost</label>
            <div className="amount-input-wrapper">
              <span className="dollar-sign">$</span>
              <input
                type="text"
                placeholder="0.00"
                className="input-amount"
                value={estimatedCost}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, "");
                  const parts = value.split(".");
                  if (parts.length > 2) return;
                  if (parts[1] && parts[1].length > 2) return;
                  setEstimatedCost(value);
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    setEstimatedCost(parseFloat(e.target.value).toFixed(2));
                  }
                }}
              />
            </div>
          </div>

          <button className="btn-save" onClick={handleSaveExperience}>
            Save Experience
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - LIST */}
      <div className="experiences-list-container">
        <div className="experiences-header">
          <h2>Your Experiences</h2>
          <div className="experience-count">
            {experiences.length} experience{experiences.length !== 1 ? "s" : ""}
          </div>
        </div>

        {experiences.length > 0 ? (
          <>
            <div className="total-amount-card">
              Total Planned: ${totalEstimated.toFixed(2)}
            </div>

            <div className="experiences-list">
              {experiences.map((item) => (
                <div key={item.id} className="experience-card">
                  <div className="experience-card-content">
                    <div className="experience-card-header">
                      <div className="experience-info">
                        <h3>{item.name}</h3>
                      </div>

                      <div className="experience-cost">
                        ${item.estimatedCost.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteExperience(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎟️</div>
            <h3>No experiences yet</h3>
            <p>Add a concert, restaurant, trip, or anything you want to do this month!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Experiences;