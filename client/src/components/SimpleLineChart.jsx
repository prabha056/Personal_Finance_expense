import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ErrorBoundary from './ErrorBoundary';


function SimpleLineChart({data}) {
  // Validate data structure
  const isValidData = data && Array.isArray(data) && 
    data.every(item => 
      typeof item === 'object' && 
      item !== null && 
      'month' in item && 
      'income' in item && 
      'expense' in item
    );

  // Handle error state
  if (!isValidData) {
    return (
      <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ textAlign: 'center', color: '#666' }}>
          {!data ? 'Loading data...' : `Invalid data format. Expected: [{month, income, expense}]. Received: ${JSON.stringify(data)}`}
        </p>
      </div>
    );
  }

  // Handle empty data
  if (data.length === 0) {
    return (
      <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ textAlign: 'center', color: '#666' }}>
          No transaction data available for the current year.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ErrorBoundary>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line strokeWidth={3} type="monotone" dataKey="income" stroke="#4CAF50" activeDot={{ r: 8 }} />
            <Line strokeWidth={3} type="monotone" dataKey="expense" stroke="#F44336" />
          </LineChart>
        </ResponsiveContainer>
      </ErrorBoundary>
    </div>
  );
}

export default SimpleLineChart;
