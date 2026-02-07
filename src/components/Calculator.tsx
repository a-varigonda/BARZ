import { useState, useEffect } from "react";
import useChat from "./services/useChat";
import { SYSTEM_PROMPT } from "./services/systemPrompt";
import "./Calculator.css";

function extractJSON(text: string): string {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

// ===== AI TYPES =====
type PurchaseFeasibility = "yes" | "yes_with_tradeoffs" | "no";
type RecommendedAction = "keep" | "replace" | "eliminate";

interface BudgetSummary {
  estimated_remaining_budget: number;
  post_purchase_remaining_budget: number;
}

interface ImpactedExperience {
  experience_name: string;
  recommended_action: RecommendedAction;
  reason: string;
  alternative_suggestion: string | null;
  estimated_savings: number | null;
}

interface AIReply {
  purchase_feasibility: PurchaseFeasibility;
  budget_summary: BudgetSummary;
  impacted_experiences: ImpactedExperience[];
  overall_recommendation: string;
}

// ===== INPUT TYPES =====
interface FinancialSnapshot {
  average_monthly_income: number;
  average_monthly_expenses: number;
  spending_so_far_this_month: number;
  current_date: string;
}

interface PotentialPurchase {
  item: string;
  cost: number;
  date: string;
}

interface DesiredExperiences {
  name: string;
  estimated_cost: number;
}

export interface FinancialInput {
  financial_snapshot: FinancialSnapshot;
  potential_purchase: PotentialPurchase;
  desired_experiences: DesiredExperiences[];
}

interface CalculatorProps {
  financialInput: FinancialInput;
}

function Calculator({ financialInput }: CalculatorProps) {
  const { reply, isLoading, send } = useChat();
  const [resp, setResp] = useState<AIReply | null>(null);

  const [item, setItem] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const handleAnalyze = () => {
    const parsedCost = Number(cost);
    if (!item || !date || Number.isNaN(parsedCost)) {
      alert("Please enter a valid purchase name, amount, and date!");
      return;
    }

    send([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: JSON.stringify(
          {
            ...financialInput,
            potential_purchase: { item, cost: parsedCost, date },
          },
          null,
          2,
        ),
      },
    ]);
  };

  useEffect(() => {
    if (!reply) return;
    try {
      const parsed = JSON.parse(extractJSON(reply)) as AIReply;
      setResp(parsed);
    } catch (err) {
      console.error("Invalid AI reply JSON", err, reply);
    }
  }, [reply]);

  return (
    <div className="calculator-page-layout">
      {/* LEFT SIDE */}
      <div className="calculator-form-container">
        <h2 className="section-title">Enter a Potential Purchase</h2>

        <div className="calculator-form-header">
          <input
            type="text"
            className="calculator-input-main"
            placeholder="What is the purchase?"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        <div className="calculator-form-details">
          <div className="form-row">
            <label>Approximate Cost</label>
            <div className="amount-input-wrapper">
              <span className="dollar-sign">$</span>
              <input
                type="text"
                inputMode="decimal"
                className="input-amount"
                value={cost}
                placeholder="0.00"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, "");
                  const parts = value.split(".");
                  if (parts.length > 2) return;
                  if (parts[1]?.length > 2) return;
                  setCost(value);
                }}
                onBlur={() => cost && setCost(Number(cost).toFixed(2))}
              />
            </div>
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

          <button
            className="btn-save"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Purchase"}
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="calculator-list-container">
        <div className="calculator-header">
          <h2>Impacted Experiences</h2>
          {resp && (
            <div className="calculator-count">
              {resp.impacted_experiences.length} experience
              {resp.impacted_experiences.length !== 1 && "s"}
            </div>
          )}
        </div>

        {resp ? (
          <>
            <div className="calculator-summary-card">
              <strong>Overall Recommendation</strong>
              <p>{resp.overall_recommendation}</p>
            </div>

            <div className="calculator-results-list">
              {resp.impacted_experiences.map((exp, i) => (
                <div key={i} className="calculator-card">
                  <div className="calculator-card-header">
                    <div className="calculator-title">
                      {exp.experience_name}
                    </div>
                    <span
                      className={`calculator-action calculator-action-${exp.recommended_action}`}
                    >
                      {exp.recommended_action.replace("_", " ")}
                    </span>
                  </div>

                  <p className="calculator-reason">{exp.reason}</p>

                  {exp.alternative_suggestion && (
                    <p className="calculator-alternative">
                      <strong>Alternative:</strong> {exp.alternative_suggestion}
                    </p>
                  )}

                  {exp.estimated_savings !== null && (
                    <div className="calculator-savings">
                      Estimated Savings: ${exp.estimated_savings.toFixed(2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No analysis yet</h3>
            <p>Enter a purchase and click Analyze.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
