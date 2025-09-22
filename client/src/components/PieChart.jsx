import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ErrorBoundary from './ErrorBoundary';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

export default function ExpensePieChart({ data }) {
  // Validate data structure
  const isValidData = data && Array.isArray(data) && data.length > 0 && 
    data.every(item => 
      typeof item === 'object' && 
      item !== null && 
      'name' in item && 
      'value' in item &&
      typeof item.value === 'number'
    );

  return (
    <div style={{ width: '100%', height: 400 }}>
      {isValidData ? (
        <ErrorBoundary>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ErrorBoundary>
      ) : (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          flexDirection: 'column'
        }}>
          <p style={{ textAlign: 'center', color: '#666' }}>
            {!data ? 'Loading data...' : 'No valid data to display'}
          </p>
        </div>
      )}
    </div>
  );
}
