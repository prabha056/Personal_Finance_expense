import React from 'react'
import MoneyCard from '../components/MoneyCard'
import SimpleLineChart from '../components/SimpleLineChart'
import PieChart from '../components/PieChart'
import { useAppContext } from '../contexts/AppProvider'
import ErrorBoundary from '../components/ErrorBoundary'

function Dashboard() {
  const { statistic, yearData } = useAppContext();
  
  // Validate data
  const isValidStatistic = statistic && typeof statistic === 'object';
  const isValidYearData = Array.isArray(yearData);

  return (
    <ErrorBoundary>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
            <MoneyCard 
              title={"Total Balance"} 
              amount={isValidStatistic ? statistic.balance : 0}
              icon={"$"} 
              style={"text-green-600"} 
              textColor={isValidStatistic && statistic.balance >= 0 ? "text-green-500" : "text-red-500"} 
            />
            <MoneyCard 
              title={"Monthly Income"} 
              amount={isValidStatistic ? statistic.income : 0} 
              icon={"+"} 
              style={"text-blue-500"} 
            />
          </div>
          
          <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
            <MoneyCard 
              title={"Monthly Expenses"} 
              amount={isValidStatistic ? statistic.expense : 0} 
              icon={"-"} 
              style={"text-red-600"} 
              textColor="text-red-600" 
            />
            <MoneyCard 
              title={"Savings Rate"} 
              isPrice={false}
              amount={isValidStatistic ? statistic.savingRate : 0} 
              textColor={isValidStatistic && statistic.savingRate >= 0 ? "text-green-500" : "text-red-500"}
              icon={"%"} 
              color={""} 
              style={"text-black"} 
            />
          </div>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 mt-4 gap-4'>
          <div className='bg-white rounded-xl p-6 border border-gray-200'>
            <h3 className='font-semibold text-2xl'>Income vs Expenses</h3>
            <div className='mt-12'>
              <SimpleLineChart data={isValidYearData ? yearData : []} />
            </div>
          </div>
          <div className='bg-white rounded-xl p-6 border border-gray-200'>
            <h3 className='font-semibold text-2xl'>Expense Categories</h3>
            <div>
              <PieChart data={isValidStatistic ? statistic.categoryBreakdown : []} />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Dashboard