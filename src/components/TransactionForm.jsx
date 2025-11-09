import React, { useState } from "react";
import dayjs from "dayjs";

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) {
      alert("Enter valid amount");
      return;
    }
    onAdd({ amount: parseFloat(amount), type, category, date, note });
    setAmount("");
    setNote("");
  }

  return (
    <form className="tx-form" onSubmit={submit}>
      <input
        placeholder="Amount..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="tx-input"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="tx-select"
      >
        <option>Expense</option>
        <option>Income</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="tx-select"
      >
        <option>Food</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Travel</option>
        <option>Salary</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="tx-input"
      />

      <input
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="tx-input note"
      />

      <button type="submit" className="tx-add-btn">
        Add Transaction
      </button>
    </form>
  );
}
