import React from "react";
import { formatCurrency } from "../utils/formatCurrency";

const SummaryCard = ({
  title,
  amount,
  change,
  changeLabel,
  icon,
  iconBg,
  positive,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {formatCurrency(amount)}
        </p>
        <p
          className={`text-xs font-medium ${positive ? "text-green-500" : "text-red-500"}`}
        >
          {change} {changeLabel}
        </p>
      </div>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;
