import { useState } from "react";
import "./Expenses.css";

// Define the type for an expense
interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

function Expenses() {
  // State to hold all expenses
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  // State for form inputs
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Housing");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle saving expense
  const handleSaveExpense = () => {
    // Validate that required fields are filled
    if (!expenseName || !amount || !date) {
      alert("Please fill in expense name, amount, and date!");
      return;
    }

    // Create new expense object
    const newExpense: Expense = {
      id: Date.now(), // Use timestamp as unique ID
      name: expenseName,
      amount: parseFloat(amount),
      category: category,
      date: date,
      description: description
    };

    // Add to expenses list
    setExpenses([newExpense, ...expenses]); // Add to beginning of array

    // Clear form
    setExpenseName("");
    setAmount("");
    setCategory("Housing");
    setDate("");
    setDescription("");
  };

  // Function to delete an expense
  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expenses-page-layout">
      {/* LEFT SIDE - FORM */}
      <div className="expense-form-container">
        <h2 className="section-title">Add New Expense</h2>
        
        <div className="expense-form-header">
          <input 
            type="text" 
            placeholder="What is your expense?" 
            className="expense-input-main"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>

        <div className="expense-form-details">
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
                  // Only allow numbers and one decimal point
                  const value = e.target.value.replace(/[^\d.]/g, '');
                  
                  // Ensure only one decimal point
                  const parts = value.split('.');
                  if (parts.length > 2) return;
                  
                  // Limit to 2 decimal places
                  if (parts[1] && parts[1].length > 2) return;
                  
                  setAmount(value);
                }}
                onBlur={(e) => {
                  // Format on blur (when user clicks away)
                  if (e.target.value) {
                    const formatted = parseFloat(e.target.value).toFixed(2);
                    setAmount(formatted);
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
              <option>Housing</option>
              <option>Food</option>
              <option>Utilities</option>
              <option>Personal Care</option>
              <option>Transportation</option>
              <option>Entertainment</option>
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
              placeholder="Add details about this expense..." 
              className="input-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn-save" onClick={handleSaveExpense}>
            Save Expense
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - EXPENSES LIST */}
      <div className="expenses-list-container">
        <div className="expenses-header">
          <h2>Your Expenses</h2>
          <div className="expense-count">{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</div>
        </div>

        {expenses.length > 0 ? (
          <>
            <div className="total-amount-card">
              Total Spent: ${totalExpenses.toFixed(2)}
            </div>

            <div className="expenses-list">
              {expenses.map((expense) => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-card-content">
                    <div className="expense-card-header">
                      <div className="expense-info">
                        <h3>{expense.name}</h3>
                        <span className="expense-category">{expense.category}</span>
                      </div>
                      <div className="expense-amount-date">
                        <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                        <div className="expense-date">{expense.date}</div>
                      </div>
                    </div>
                    {expense.description && (
                      <p className="expense-description">{expense.description}</p>
                    )}
                  </div>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No expenses yet</h3>
            <p>Add your first expense using the form on the left!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Expenses;