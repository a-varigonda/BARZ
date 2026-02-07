import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import type { FinancialInput } from "./components/Calculator";

function App() {
  const [financialInput, setFinancialInput] = useState<FinancialInput>({
    financial_snapshot: {
      average_monthly_income: 0,
      average_monthly_expenses: 0,
      spending_so_far_this_month: 0,
      current_date: "",
    },
    potential_purchase: {
      item: "",
      cost: 0,
      date: "",
    },
    desired_experiences: [],
  });

  return (
    <>
      <Calculator financialInput={financialInput} />
    </>
  );
}

export default App;
