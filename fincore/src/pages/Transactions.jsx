import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import {
  Plus,
  Search,
  Filter,
  X,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

const CATEGORIES = [
  "All",
  "Salaries",
  "Marketing",
  "Infrastructure",
  "Operations",
  "Misc",
  "Revenue",
];
const TYPES = ["all", "income", "expense"];

// ─── Add Transaction Modal ────────────────────────────────────────────────────
const AddTransactionModal = ({ onClose }) => {
  const { addTransaction } = useApp();
  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "Revenue",
    type: "income",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.date) e.date = "Date is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid positive amount";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    // ✅ This calls addTransaction from context
    addTransaction({
      date: form.date,
      description: form.description,
      category: form.category,
      type: form.type,
      amount: Number(form.amount),
    });

    onClose();
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all
    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
    ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Box */}
      <motion.div
        className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-10"
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-500 dark:text-gray-400 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass("date")}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Monthly Salaries"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={inputClass("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputClass("category")}
              >
                {[
                  "Revenue",
                  "Salaries",
                  "Marketing",
                  "Infrastructure",
                  "Operations",
                  "Misc",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className={inputClass("type")}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={inputClass("amount")}
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600
              text-sm font-medium text-gray-700 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700
              text-sm font-medium text-white transition-all"
          >
            Add Transaction
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Transactions Page ───────────────────────────────────────────────────
const Transactions = () => {
  // ✅ All state declared FIRST before any JSX
  const { allTransactions, role, darkMode } = useApp();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [showModal, setShowModal] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  // ✅ filtered defined before JSX uses it
  const filtered = allTransactions
    .filter((t) => {
      const matchSearch =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || t.type === typeFilter;
      const matchCat =
        categoryFilter === "All" || t.category === categoryFilter;
      return matchSearch && matchType && matchCat;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === "amount") {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <ChevronUp size={13} className="text-gray-300" />;
    return sortDir === "asc" ? (
      <ChevronUp size={13} className="text-blue-500" />
    ) : (
      <ChevronDown size={13} className="text-blue-500" />
    );
  };

  const thClass =
    "px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors";

  return (
    <div className="space-y-5">
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AddTransactionModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>

        {/* ✅ Role-based: Admin = button, Viewer = badge */}
        {role === "Admin" ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5
              bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              text-white text-sm font-semibold rounded-lg
              shadow-md shadow-blue-200 dark:shadow-none
              transition-all self-start sm:self-auto"
          >
            <Plus size={16} />
            Add Transaction
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2.5
              bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600
              text-gray-500 dark:text-gray-400 text-sm font-medium rounded-lg
              self-start sm:self-auto"
          >
            <Eye size={15} />
            View Only Mode
          </motion.div>
        )}
      </motion.div>

      {/* ── Filters ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100
          dark:border-gray-700 p-4 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600
                rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Type */}
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400 shrink-0" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600
                rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                focus:outline-none focus:border-blue-500 transition-all"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === "all"
                    ? "All Types"
                    : t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600
              rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
              focus:outline-none focus:border-blue-500 transition-all"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* ── Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100
          dark:border-gray-700 shadow-sm overflow-hidden"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div
              className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full
              flex items-center justify-center mb-4"
            >
              <Search size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-base">
              No transactions found
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px]">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  {[
                    { label: "Date", field: "date" },
                    { label: "Description", field: "description" },
                    { label: "Category", field: "category" },
                    { label: "Type", field: "type" },
                    { label: "Amount", field: "amount" },
                  ].map(({ label, field }) => (
                    <th
                      key={field}
                      className={thClass}
                      onClick={() => handleSort(field)}
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        <SortIcon field={field} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                <AnimatePresence>
                  {filtered.map((tx, i) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ delay: i * 0.025 }}
                      className="hover:bg-gray-50/80 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-4 py-3.5 text-sm font-medium text-gray-900 dark:text-white">
                        {tx.description}
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-medium
                          bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          {tx.category}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                          ${
                            tx.type === "income"
                              ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400"
                          }`}
                        >
                          {tx.type === "income" ? (
                            <ArrowUpRight size={11} />
                          ) : (
                            <ArrowDownRight size={11} />
                          )}
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </span>
                      </td>

                      <td
                        className={`px-4 py-3.5 text-sm font-bold whitespace-nowrap
                        ${
                          tx.type === "income"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Transactions;
