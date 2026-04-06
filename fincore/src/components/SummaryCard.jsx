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
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100
      dark:border-gray-700 p-4 md:p-5 flex items-start justify-between
      hover:shadow-md transition-shadow duration-200 cursor-default"
    >
      <div className="min-w-0">
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">
          {title}
        </p>
        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
          {formatCurrency(amount)}
        </p>
        <p
          className={`text-xs font-medium ${positive ? "text-green-500" : "text-red-500"}`}
        >
          {change} {changeLabel}
        </p>
      </div>
      <div
        className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center
        text-white text-base md:text-lg shrink-0 ml-3 ${iconBg}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;
