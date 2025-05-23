import React from "react";

const ProgressBar = ({ current, goal }: {current: number, goal: number}) => {
  const percentage = Math.min((current / goal) * 100, 100).toFixed(1);

  return (
    <div className="w-full p-3 sm:p-4 bg-white rounded-2xl shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Funded</span>
        <span className="text-sm font-medium text-gray-500">
          €{current} / €{goal}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r to-[#4a7ece] from-[#063d75] h-4 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
