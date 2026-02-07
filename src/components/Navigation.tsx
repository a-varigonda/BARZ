import "./Navigation.css";

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  return (
    <div className="sidebar">
      <div
        className="logo"
        onClick={() => setCurrentPage("home")}
        style={{ cursor: "pointer" }}
      >
        <div className="logo-icon">$</div>
        <h1 className="logo-text">Gold Barz</h1>
      </div>

      <nav className="nav-menu">
        <a
          href="#"
          className={`nav-item ${currentPage === "expenses" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("expenses");
          }}
        >
          <span className="nav-icon">💳</span>
          <span>Expenses</span>
        </a>
        <a
          href="#"
          className={`nav-item ${currentPage === "earnings" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("earnings");
          }}
        >
          <span className="nav-icon">💵</span>
          <span>Earnings</span>
        </a>
        <a
          href="#"
          className={`nav-item ${currentPage === "experiences" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("experiences");
          }}
        >
          <span className="nav-icon">🎁</span>
          <span>Experiences</span>
        </a>
        <a
          href="#"
          className={`nav-item ${currentPage === "savings" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("savings");
          }}
        >
          <span className="nav-icon">🏦</span>
          <span>Savings</span>
        </a>
        <a
          href="#"
          className={`nav-item ${currentPage === "calculator" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("calculator");
          }}
        >
          <span className="nav-icon">🧮</span>
          <span>Calculator</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a
          href="#"
          className={`nav-item ${currentPage === "account" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage("account");
          }}
        >
          <span className="nav-icon">👤</span>
          <span>Manage Account</span>
        </a>
      </div>
    </div>
  );
}

export default Navigation;
