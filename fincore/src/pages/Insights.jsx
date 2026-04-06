import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { monthlyData, categoryData } from "../data/mockTransactions";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Insights = () => {
  const { totalIncome, totalExpenses, darkMode } = useApp();

  const axisColor = darkMode ? "#9CA3AF" : "#6B7280";
  const gridColor = darkMode ? "#374151" : "#E5E7EB";

  const highestCategory = [...categoryData].sort(
    (a, b) => b.value - a.value,
  )[0];
  const lowestCategory = [...categoryData].sort((a, b) => a.value - b.value)[0];

  const lastMonth = monthlyData[monthlyData.length - 2];
  const thisMonth = monthlyData[monthlyData.length - 1];
  const momGrowth = (
    ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) *
    100
  ).toFixed(1);
  const profitMargin = (
    ((thisMonth.revenue - thisMonth.expenses) / thisMonth.revenue) *
    100
  ).toFixed(1);

  const runway = Math.floor(totalIncome / (totalExpenses / 6));

  const observations = [
    {
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-900/20",
      title: "Revenue Growing",
      desc: `Revenue has grown ${momGrowth}% month-over-month, indicating strong business momentum.`,
    },
    {
      icon: AlertCircle,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      title: "High Salary Cost",
      desc: `Salaries account for ${((85000 / totalExpenses) * 100).toFixed(0)}% of total expenses. Consider optimizing headcount efficiency.`,
    },
    {
      icon: CheckCircle,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      title: "Healthy Profit Margin",
      desc: `${profitMargin}% profit margin this month is above the industry average of 15–20% for SaaS startups.`,
    },
    {
      icon: TrendingDown,
      color: "text-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      title: "Expenses Controlled",
      desc: `Expenses grew only 5.6% while revenue grew ${momGrowth}%, showing good cost discipline.`,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Key observations and financial analysis
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          {
            label: "Highest Spend",
            value: highestCategory.name,
            sub: formatCurrency(highestCategory.value),
            icon: TrendingDown,
            color: "text-red-500",
            bg: "bg-red-50 dark:bg-red-900/20",
          },
          {
            label: "Lowest Spend",
            value: lowestCategory.name,
            sub: formatCurrency(lowestCategory.value),
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-900/20",
          },
          {
            label: "Cash Runway",
            value: `${runway} months`,
            sub: "at current burn rate",
            icon: DollarSign,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            label: "Profit Margin",
            value: `${profitMargin}%`,
            sub: "this month",
            icon: TrendingUp,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/20",
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5"
          >
            <div
              className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-3`}
            >
              <card.icon size={18} className={card.color} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {card.label}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {card.value}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {card.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Comparison Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 md:p-5"
      >
        <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Revenue vs Expenses Comparison
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={monthlyData}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: axisColor, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span
                  style={{
                    color: value === "revenue" ? "#3B82F6" : "#F87171",
                    fontSize: 12,
                  }}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              )}
            />
            <Bar
              dataKey="revenue"
              name="revenue"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="expenses"
              name="expenses"
              fill="#F87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Spend Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 md:p-5"
      >
        <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
          Spending Breakdown
        </h2>
        <div className="space-y-3">
          {categoryData.map((item, i) => {
            const total = categoryData.reduce((s, c) => s + c.value, 0);
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {pct}%
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white w-20 text-right">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Observations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 md:p-5"
      >
        <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
          Key Observations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {observations.map((obs, i) => (
            <motion.div
              key={obs.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`flex gap-3 p-4 rounded-xl ${obs.bg}`}
            >
              <div className="shrink-0 mt-0.5">
                <obs.icon size={18} className={obs.color} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${obs.color} mb-1`}>
                  {obs.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {obs.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Insights;
