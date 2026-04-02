import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { useApp } from "./context/AppContext";

function AppContent() {
  const [activePage, setActivePage] = useState("dashboard");
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-100"}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <Header />

      {/* ml-0 on mobile (no sidebar), ml-60 on desktop */}
      <main className="ml-0 md:ml-60 pt-14 p-4 md:p-6 min-h-screen">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "transactions" && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-lg">Transactions — Coming Day 2</p>
          </div>
        )}
        {activePage === "insights" && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-lg">Insights — Coming Day 2</p>
          </div>
        )}
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
