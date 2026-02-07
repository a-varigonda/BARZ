import "./App.css";
import { useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Expenses from "./components/Expenses";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* MAIN CONTENT */}
      <div className="main-content">
        {currentPage === "home" && <Home />}
        {currentPage === "expenses" && <Expenses />}
        {/* Add other pages here later */}
        {currentPage === "earnings" && <div><h1>Earnings Page - Coming Soon!</h1></div>}
        {currentPage === "experiences" && <div><h1>Experiences Page - Coming Soon!</h1></div>}
        {currentPage === "account" && <div><h1>Manage Account - Coming Soon!</h1></div>}
      </div>
    </div>
  );
}

export default App;