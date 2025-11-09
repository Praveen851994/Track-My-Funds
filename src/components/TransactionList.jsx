// src/components/TransactionList.jsx
import React from "react";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="transactions">
      {transactions.map((t) => (
        <div
          key={t.id}
          className={`transaction ${t.type.toLowerCase()}`}
        >
          <div className="tx-info">
            <span>{t.date}</span> • <span>{t.category}</span> •{" "}
            <span>{t.note}</span>
            <strong>
              {t.type === "Income" ? "+" : "-"}₹{t.amount}
            </strong>
          </div>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
