import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { AnimatePresence, motion } from "framer-motion";

function AppContent() {
  const [activePage, setActivePage] = useState("dashboard");
  const { darkMode } = useApp();

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <Header activePage={activePage} />

      {/* pt-20 gives enough room below fixed header */}
      <main className="ml-0 md:ml-60 pt-20 px-4 pb-6 md:px-6 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "transactions" && <Transactions />}
            {activePage === "insights" && <Insights />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
