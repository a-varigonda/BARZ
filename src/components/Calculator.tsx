import { useState } from "react";
import useChat from "./services/useChat";
import { SYSTEM_PROMPT } from "./services/systemPrompt";

//From summary data
interface FinancialSnapshot {
  average_monthly_income: number;
  average_monthly_expenses: number;
  spending_so_far_this_month: number;
  current_date: string; // ISO date string
}

interface PotentialPurchase {
  item: string;
  cost: number;
  date: string; // ISO date string
}

//From experiences tab
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
  //We should add something while its loading
  const { reply, isLoading, send } = useChat();

  return (
    <div>
      <button
        onClick={() =>
          send([
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: JSON.stringify(financialInput, null, 2),
            },
          ])
        }
      >
        Press Me!
      </button>

      <div>{reply}</div>
    </div>
  );
}

export default Calculator;
