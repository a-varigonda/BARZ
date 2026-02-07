import { useState } from "react";
import "./Earnings.css";

interface Earning {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

function Earnings() {
  const [earnings, setEarnings] = useState<Earning[]>([]);

  const [earningName, setEarningName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Paycheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveEarning = () => {
    if (!earningName || !amount || !date) {
      alert("Please fill in earning name, amount, and date!");
      return;
    }

    const newEarning: Earning = {
      id: Date.now(),
      name: earningName,
      amount: parseFloat(amount),
      category,
      date,
      description
    };

    setEarnings([newEarning, ...earnings]);

    setEarningName("");
    setAmount("");
    setCategory("Paycheck");
    setDate("");
    setDescription("");
  };

  const handleDeleteEarning = (id: number) => {
    setEarnings(earnings.filter((earning) => earning.id !== id));
  };

  const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0);

  return (
    <div className="earnings-page-layout">
      {/* LEFT SIDE - FORM */}
      <div className="earning-form-container">
        <h2 className="section-title">Add New Earning</h2>

        <div className="earning-form-header">
          <input
            type="text"
            placeholder="What is your earning?"
            className="earning-input-main"
            value={earningName}
            onChange={(e) => setEarningName(e.target.value)}
          />
        </div>

        <div className="earning-form-details">
          <div className="form-row">
            <label>Amount</label>
            <div className="amount-input-wrapper">
              <span className="dollar-sign">$</span>
              <input
                type="text"
                placeholder="0.00"
                className="input-amount"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, "");
                  const parts = value.split(".");
                  if (parts.length > 2) return;
                  if (parts[1] && parts[1].length > 2) return;
                  setAmount(value);
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    setAmount(parseFloat(e.target.value).toFixed(2));
                  }
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <label>Category</label>
            <select
              className="input-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Paycheck</option>
              <option>Birthday</option>
              <option>Pocket Money</option>
              <option>Gift</option>
              <option>Side Hustle</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-row">
            <label>Date</label>
            <input
              type="date"
              className="input-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              placeholder="Add details about this earning..."
              className="input-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn-save" onClick={handleSaveEarning}>
            Save Earning
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - EARNINGS LIST */}
      <div className="earnings-list-container">
        <div className="earnings-header">
          <h2>Your Earnings</h2>
          <div className="earning-count">
            {earnings.length} earning{earnings.length !== 1 ? "s" : ""}
          </div>
        </div>

        {earnings.length > 0 ? (
          <>
            <div className="total-amount-card">
              Total Earned: ${totalEarnings.toFixed(2)}
            </div>

            <div className="earnings-list">
              {earnings.map((earning) => (
                <div key={earning.id} className="earning-card">
                  <div className="earning-card-content">
                    <div className="earning-card-header">
                      <div className="earning-info">
                        <h3>{earning.name}</h3>
                        <span className="earning-category">{earning.category}</span>
                      </div>
                      <div className="earning-amount-date">
                        <div className="earning-amount">
                          ${earning.amount.toFixed(2)}
                        </div>
                        <div className="earning-date">{earning.date}</div>
                      </div>
                    </div>

                    {earning.description && (
                      <p className="earning-description">{earning.description}</p>
                    )}
                  </div>

                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteEarning(earning.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💰</div>
            <h3>No earnings yet</h3>
            <p>Add your first earning using the form on the left!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Earnings;