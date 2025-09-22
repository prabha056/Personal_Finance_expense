import React, { useState } from 'react';
import { SquarePen, X, Save } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';

function BudgetCardDisplay({ item }) {
    const { updateBudget, deleteBudget, getBudgetUsage, getBudgets } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAmount, setEditedAmount] = useState(item?.amount || 0);
    const [loading, setLoading] = useState(false);

    // Validate item data
    if (!item || typeof item !== 'object') {
        return (
            <div className='bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center px-5 py-4 rounded-xl'>
                <div className="text-center text-gray-500 w-full">
                    Invalid budget item data
                </div>
            </div>
        );
    }

    // Safely extract values with defaults
    const category = item.category || 'Unknown Category';
    const amount = typeof item.amount === 'number' ? item.amount : 0;
    const itemId = item._id;

    const handleSave = async () => {
        if (!itemId || !editedAmount || editedAmount <= 0) {
            return;
        }
        
        setLoading(true);
        try {
            await updateBudget(
                itemId,
                {
                    category: category,
                    amount: parseFloat(editedAmount)
                }
            );
            await getBudgetUsage();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating budget:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (!itemId) {
            return;
        }
        
        setLoading(true);
        try {
            await deleteBudget(itemId);
            await getBudgets();
            await getBudgetUsage();
        } catch (error) {
            console.error('Error deleting budget:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center px-5 py-4 rounded-xl'>
            <div>
                <p className='font-semibold text-xl'>{category}</p>
                <p className='text-sm text-black/70'>Monthly Budget</p>
            </div>

            <div className='flex items-center justify-between gap-4 mt-3 md:mt-0'>
                {isEditing ? (
                    <input
                        type='number'
                        value={editedAmount}
                        onChange={(e) => setEditedAmount(e.target.value)}
                        className='border border-gray-300 rounded-md px-2 py-1 w-28'
                        disabled={loading}
                        min="0"
                        step="0.01"
                    />
                ) : (
                    <span className='text-lg font-bold'>Rs {amount.toFixed(2)}</span>
                )}
                <div className='flex gap-2'>
                    {isEditing ? (
                        <button
                            className='hover:bg-green-50 text-green-600 p-1 rounded-md border border-gray-200 hover:border-green-400 disabled:opacity-50'
                            onClick={handleSave}
                            disabled={loading || !editedAmount || editedAmount <= 0}
                        >
                            <Save size={20} />
                        </button>
                    ) : (
                        <button
                            className='hover:bg-blue-50 text-blue-500 p-1 rounded-md border border-gray-200 hover:border-blue-300 disabled:opacity-50'
                            onClick={() => setIsEditing(true)}
                            disabled={loading}
                        >
                            <SquarePen size={20} />
                        </button>
                    )}
                    <button
                        className='hover:bg-red-50 text-red-500 p-1 rounded-md border border-gray-200 hover:border-red-300 disabled:opacity-50'
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BudgetCardDisplay;
