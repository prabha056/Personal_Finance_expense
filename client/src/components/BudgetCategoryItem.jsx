import React from "react";

const BudgetCategoryItem = ({ item }) => {
  // Validate item data
  if (!item || typeof item !== 'object') {
    return (
      <div className="px-4 py-5 border border-gray-200 rounded-xl bg-white">
        <div className="text-center text-gray-500">
          Invalid budget item data
        </div>
      </div>
    );
  }

  // Safely extract values with defaults
  const category = item.category || 'Unknown Category';
  const spent = typeof item.spent === 'number' ? item.spent : 0;
  const allocated = typeof item.allocated === 'number' ? item.allocated : 0;
  const percentLeft = typeof item.percentLeft === 'number' ? item.percentLeft : 0;
  const remaining = typeof item.remaining === 'number' ? item.remaining : 0;

  const getPercentageColor = () => {
    const usedPercentage = 100 - percentLeft;
    if (usedPercentage > 100) return "text-red-500";
    if (usedPercentage >= 90) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="px-4 py-5 border border-gray-200 rounded-xl bg-white">
      <div className="flex items-center mb-1 justify-between gap-4 space-y-2">
        <div>
          <div>
            <div className="font-semibold text-lg">{category}</div>
            <div className="text-gray-600">
              Rs.{spent.toFixed(2)} of Rs.{allocated.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className={`${getPercentageColor()} font-semibold`}>
            {percentLeft}%
          </div>
          <div className="text-sm">
            {remaining >= 0 ? (
              <span className="text-green-600">Rs.{remaining.toFixed(2)} left</span>
            ) : (
              <span className="text-red-500">
                Over budget by Rs.{Math.abs(remaining).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded mb-1">
        <div
          className="h-full bg-black rounded"
          style={{ width: `${Math.max(0, Math.min(100, 100 - parseFloat(percentLeft)))}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCategoryItem;
