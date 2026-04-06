import React, { createContext, useContext, useState, useEffect } from "react";
import { transactions } from "../data/mockTransactions";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("Admin");
  const [darkMode, setDarkMode] = useState(false);

  const [allTransactions, setAllTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("fincore_transactions");
      return saved ? JSON.parse(saved) : transactions;
    } catch {
      return transactions;
    }
  });

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  // ✅ Sync to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem(
      "fincore_transactions",
      JSON.stringify(allTransactions),
    );
  }, [allTransactions]);

  // ✅ Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ✅ Fixed addTransaction — adds to TOP of list with unique id
  const addTransaction = (tx) => {
    const newTx = {
      ...tx,
      id: Date.now(),
      amount: Number(tx.amount),
    };
    setAllTransactions((prev) => [newTx, ...prev]);
  };

  // ✅ Summary calculations — recalculate live from allTransactions
  const totalIncome = allTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = allTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpenses;
  const burnRate = Math.round(totalExpenses / 6);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        darkMode,
        setDarkMode,
        allTransactions,
        addTransaction,
        filters,
        setFilters,
        totalIncome,
        totalExpenses,
        totalBalance,
        burnRate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
