import React from 'react'
import { CalendarDays } from 'lucide-react';

function TransactionCard({ item }) {
    // Validate item data
    if (!item || typeof item !== 'object') {
        return (
            <div className="flex justify-between items-center bg-gray-50 px-4 py-4 rounded-xl">
                <div className="text-center text-gray-500 w-full">
                    Invalid transaction data
                </div>
            </div>
        );
    }

    // Safely extract values with defaults
    const description = item.description || 'No description';
    const category = item.category || 'Unknown';
    const amount = typeof item.amount === 'number' ? item.amount : 0;
    const type = item.type || 'Unknown';
    const date = item.date ? new Date(item.date) : new Date();

    return (
        <div className="flex justify-between items-center bg-gray-50 px-4 py-4 rounded-xl">
            <div>
                <h4 className="font-bold text-lg text-black/80">{description}</h4>
                <p className="text-sm text-gray-500">{category}</p>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                    <CalendarDays size={14} className="mr-1" />
                    {date.toLocaleString()}
                </div>
            </div>

            <div className="text-right">
                <p
                    className={`font-bold text-xl
                        ${type === 'Expense' ? 'text-red-500' : 'text-green-600'
                        }`}
                >
                    Rs.{amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">{type}</p>
            </div>
        </div>
    )
}

export default TransactionCard