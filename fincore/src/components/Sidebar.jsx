import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "Transactions", icon: ArrowLeftRight, key: "transactions" },
  { label: "Insights", icon: TrendingUp, key: "insights" },
];

const Sidebar = ({ activePage, setActivePage }) => {
  const { darkMode } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLinks = () => (
    <>
      {navItems.map(({ label, icon: Icon, key }) => {
        const isActive = activePage === key;
        return (
          <button
            key={key}
            onClick={() => {
              setActivePage(key);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : darkMode
                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            <Icon size={18} />
            {label}
          </button>
        );
      })}
    </>
  );

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-full w-60 z-20 flex-col border-r
        ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <div
          className={`px-6 py-5 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <span
            className={`text-xl font-bold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            FinCore
          </span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLinks />
        </nav>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-30 h-14 flex items-center justify-between px-4 border-b
        ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <span
          className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          FinCore
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`p-2 rounded-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside
            className={`relative w-64 h-full flex flex-col border-r z-30
            ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <div
              className={`px-6 py-5 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}
            >
              <span
                className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                FinCore
              </span>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              <NavLinks />
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
