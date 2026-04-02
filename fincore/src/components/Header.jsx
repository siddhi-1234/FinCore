import React from "react";
import { useApp } from "../context/AppContext";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { role, setRole, darkMode, setDarkMode } = useApp();

  return (
    <header
      className={`fixed top-0 right-0 z-10 h-14 flex items-center justify-end px-4 border-b
      left-0 md:left-60
      ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
    >
      {/* Role Switcher */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className={`mr-3 px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer
          ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-700"
          }`}
      >
        <option value="Admin">Admin</option>
        <option value="Viewer">Viewer</option>
      </select>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-lg border transition-all
          ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-yellow-400"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
      >
        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
};

export default Header;
