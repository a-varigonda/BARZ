import "./App.css";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Expenses from "./components/Expenses";
import Earnings from "./components/Earnings";
import Experiences from "./components/Experiences";
import Savings from "./components/Savings";
import Calculator, { type FinancialInput } from "./components/Calculator";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // const [financialInput, setFinancialInput] = useState<FinancialInput>({
  //   financial_snapshot: {
  //     average_monthly_income: 0,
  //     average_monthly_expenses: 0,
  //     spending_so_far_this_month: 0,
  //     current_date: "",
  //   },
  //   potential_purchase: {
  //     item: "",
  //     cost: 0,
  //     date: "",
  //   },
  //   desired_experiences: [],
  // });

  const [financialInput, setFinancialInput] = useState<FinancialInput>({
    financial_snapshot: {
      average_monthly_income: 2200,
      average_monthly_expenses: 1800,
      spending_so_far_this_month: 650,
      current_date: "2026-02-04",
    },
    potential_purchase: {
      item: "",
      cost: 0,
      date: "",
    },
    desired_experiences: [
      {
        name: "Friend’s birthday dinner",
        estimated_cost: 60,
      },
      {
        name: "Movie night + snacks",
        estimated_cost: 35,
      },
      {
        name: "Short weekend trip",
        estimated_cost: 200,
      },
    ],
  });

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* MAIN CONTENT */}
      <div className="main-content">
        {currentPage === "home" && <Home />}
        {currentPage === "expenses" && <Expenses />}
        {/* Add other pages here later */}
        {currentPage === "earnings" && <Earnings />}
        {currentPage === "experiences" && <Experiences />}
        {currentPage === "savings" && <Savings />}
        {currentPage === "calculator" && (
          <Calculator financialInput={financialInput} />
        )}
        {currentPage === "account" && (
          <div>
            <h1>Manage Account - Coming Soon!</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
