import React, { useState, useEffect, useContext } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import { ThemeContext } from "./ThemeContext";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.css";

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  function handleAdd(data) {
    const parsed = dayjs(data.date, ["YYYY-MM-DD", "DD-MM-YYYY"]);
    const isoDate = parsed.isValid() ? parsed.format("YYYY-MM-DD") : data.date;
    const newTx = { id: uid(), ...data, date: isoDate };
    setTransactions([newTx, ...transactions]);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this transaction?")) return;
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  const filteredTxs = transactions.filter((tx) => {
    const date = dayjs(tx.date, ["YYYY-MM-DD", "DD-MM-YYYY"], true);
    if (!date.isValid()) return false;
    if (filter === "week") return date.isSame(dayjs(), "week");
    if (filter === "month") return date.isSame(dayjs(), "month");
    return true;
  });

  return (
    <div className="page-wrap">
      <header className="top-header">
        <h1 className="brand">💰 TRACK MY FUNDS</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <main className="main-dashboard">
        <h2 className="page-title">Expense Dashboard</h2>

        <div className="filter-tabs">
          <button
            className={filter === "all" ? "tab active" : "tab"}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "week" ? "tab active" : "tab"}
            onClick={() => setFilter("week")}
          >
            Weekly
          </button>
          <button
            className={filter === "month" ? "tab active" : "tab"}
            onClick={() => setFilter("month")}
          >
            Monthly
          </button>
        </div>

        <Summary txs={filteredTxs} />
        <TransactionForm onAdd={handleAdd} />
        <TransactionList transactions={filteredTxs} onDelete={handleDelete} />
      </main>
    </div>
  );
}
