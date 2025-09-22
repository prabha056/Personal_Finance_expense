import React from "react";
import BudgetCategoryItem from "../components/BudgetCategoryItem";
import { useAppContext } from "../contexts/AppProvider";
import MoneyCard from "../components/MoneyCard";
import ErrorBoundary from "../components/ErrorBoundary";

function Budgets() {
  const { budgetUsage, loading } = useAppContext();

  // More lenient validation - just check if budgetUsage exists and is an object
  const isValidBudgetUsage = budgetUsage && typeof budgetUsage === 'object';

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading budget data...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (!isValidBudgetUsage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Unable to load budget data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <MoneyCard 
          title={"Total Budget"} 
          amount={budgetUsage.total?.totalBudget || 0} 
          icon={"$"} 
          style={"text-green-600"} 
        />
        <MoneyCard 
          title={"Total Spent"} 
          amount={budgetUsage.total?.totalSpent || 0} 
          icon={"-"} 
          style={"text-red-600"} 
          textColor="text-red-600" 
        />
        <MoneyCard 
          title={"Remaining"} 
          textColor={(budgetUsage.total?.totalSpent || 0) >= 0 ? "text-green-500" : "text-red-500"}
          amount={budgetUsage.total?.remaining || 0} 
          icon={"$"} 
          style={"text-green-600"} 
        />
      </div>

      <div className="my-12 grid grid-cols-1 gap-4">
        <h3 className="text-2xl font-semibold">Budget Categories</h3>
        {budgetUsage.report && Array.isArray(budgetUsage.report) && budgetUsage.report.length > 0 ? (
          budgetUsage.report.map((item, index) => (
            <BudgetCategoryItem
              key={index}
              item={item}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No budget categories found. Create some budgets to get started!</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default Budgets;
