import React from "react";
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/SummaryCard";
import { monthlyData, categoryData } from "../data/mockTransactions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
          {label}
        </p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name} : {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { totalBalance, totalIncome, totalExpenses, burnRate, darkMode } =
    useApp();

  const summaryCards = [
    {
      title: "Total Balance",
      amount: totalBalance,
      change: "↑ 8.2%",
      changeLabel: "vs last month",
      icon: "$",
      iconBg: "bg-blue-500",
      positive: true,
    },
    {
      title: "Monthly Revenue",
      amount: totalIncome,
      change: "↑ 8.6%",
      changeLabel: "vs last month",
      icon: "↗",
      iconBg: "bg-green-500",
      positive: true,
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
      change: "↓ 5.6%",
      changeLabel: "vs last month",
      icon: "↘",
      iconBg: "bg-red-500",
      positive: false,
    },
    {
      title: "Burn Rate",
      amount: burnRate,
      change: "↓",
      changeLabel: "Monthly average",
      icon: "⚡",
      iconBg: "bg-orange-400",
      positive: false,
    },
  ];

  const highestCategory = [...categoryData].sort(
    (a, b) => b.value - a.value,
  )[0];
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

  const axisColor = darkMode ? "#9CA3AF" : "#6B7280";
  const gridColor = darkMode ? "#374151" : "#E5E7EB";

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Track your business financials at a glance
        </p>
      </div>

      {/* Summary Cards — 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts — stacked on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
            Revenue vs Expenses
          </h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="month"
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: axisColor, fontSize: 10 }}
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
                      color: value === "revenue" ? "#10B981" : "#EF4444",
                      fontSize: 12,
                    }}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", r: 3 }}
                activeDot={{ r: 5 }}
                name="revenue"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: "#EF4444", r: 3 }}
                activeDot={{ r: 5 }}
                name="expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-5">
          <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
            Spending by Category
          </h2>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie
                data={categoryData}
                cx={80}
                cy={80}
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="mt-3 space-y-2">
            {categoryData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-5">
        <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-4">
          Quick Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Highest Spend Category
            </p>
            <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
              {highestCategory.name} (${highestCategory.value.toLocaleString()})
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              MoM Growth
            </p>
            <p
              className={`text-sm md:text-base font-semibold
              ${parseFloat(momGrowth) >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {momGrowth > 0 ? "+" : ""}
              {momGrowth}%
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Profit Margin
            </p>
            <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
              {profitMargin}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
