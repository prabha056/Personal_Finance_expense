import React from 'react'

function MoneyCard({ title, icon, amount = 0, style, textColor = "", isPrice = true }) {
    // Safely parse amount
    const parsedAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    
    return (
        <div className='w-full py-6 px-5 border border-gray-200 rounded-xl bg-white space-y-1'>
            <div className='flex items-center justify-between gap-4 text-sm font-semibold text-black/70'>
                <span>{title || 'Unknown'}</span>
                <span className={`${style} text-xl`}>{icon || '$'}</span>
            </div>
            {isPrice ? (
                <span className={`text-2xl font-bold ${textColor}`}>
                    Rs.{parsedAmount.toFixed(2)}
                </span>
            ) : (
                <span className={`text-2xl font-bold ${textColor}`}>
                    {parsedAmount.toFixed(2)}%
                </span>
            )}
        </div>
    )
}

export default MoneyCard