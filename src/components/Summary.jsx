import React from "react";

export default function Summary({ txs }) {
  const income = txs.filter((t) => t.type === "Income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const expense = txs.filter((t) => t.type === "Expense")
    .reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expense;

  return (
    <div className="summary">
      <div>
        <h4>Income</h4>
        <p className="income">+₹{income.toFixed(2)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="expense">-₹{expense.toFixed(2)}</p>
      </div>
      <div>
        <h4>Balance</h4>
        <p>₹{balance.toFixed(2)}</p>
      </div>
    </div>
  );
}
