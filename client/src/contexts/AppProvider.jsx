import React, { createContext, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AppContext = createContext();

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true;

const defaultExpenseCategories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Other',
];


function AppProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const [search, setSearch] = useState('');
    const [budgets, setBudgets] = useState([]);
    const [statistic, setStatistic] = useState({
        balance: 0,
        income: 0,
        expense: 0,
        savingRate: 0,
        categoryBreakdown: []
    });
    const [yearData, setYearData] = useState([]);
    const [budgetUsage, setBudgetUsage] = useState({
        total: { totalBudget: 0, totalSpent: 0, remaining: 0 },
        report: []
    });
    const [transactions, setTransactions] = useState([]);

    const [expenseCategory, setExpenseCategory] = useState(defaultExpenseCategories);

    const navigate = useNavigate();

    // ---------- Auth ----------
    const register = async (formData) => {
        try {
            console.log('Attempting registration with data:', formData);
            console.log('Making request to:', `${backendURL}/api/auth/register`);
            const { data } = await axios.post('/api/auth/register', formData);
            console.log('Registration successful:', data);
            setUser(data);
            toast.success('Registered successfully');
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            console.error('Error message:', err.message);
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    const login = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/login', formData);
            setUser(data);
            toast.success('Logged in successfully');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            const { data } = await axios.post('/api/auth/logout');
            setUser(null);
            toast.success(data?.message);
            navigate('/login');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const loadUser = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            setUser(res.data);
            navigate('/');
        } catch (err) {
            // Silently handle unauthorized - user needs to login/register
            setUser(null);
            navigate('/login');
        }
    };

    // ---------- Transactions ----------
    const addTransaction = async (transaction) => {
        try {
            await axios.post('/api/transactions', transaction);
            await fetchMonthlySummary();
            await getTransactions();
            toast.success('Transaction added');
        } catch {
            toast.error('Add transaction failed');
        }
    };

    const getTransactions = async () => {
        try {
            const { data } = await axios.get('/api/transactions');
            setTransactions(data);
        } catch {
            return [];
        }
    };


    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}`);
            toast.success('Transaction deleted');
        } catch {
            toast.error('Delete transaction failed');
        }
    };

    const fetchMonthlySummary = async () => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const { data } = await axios.get(`/api/transactions/summary/${year}/${month}`);
            setStatistic(data);
        } catch (error) {
            return null;
        }
    };

    const fetchSummary = async () => {
        try {
            const { data } = await axios.get('/api/transactions/monthly-summary');
            
            // Transform data to ensure correct format
            const transformedData = transformYearData(data);
            setYearData(transformedData);
        } catch {
            console.error('Error fetching monthly summary');
            // Create sample data on error
            const transformedData = createEmptyYearData();
            setYearData(transformedData);
        }
    };

    // Helper function to transform data to correct format
    const transformYearData = (data) => {
        if (!Array.isArray(data)) {
            return createEmptyYearData();
        }

        // If data is empty, create empty data structure
        if (data.length === 0) {
            return createEmptyYearData();
        }

        // Validate and transform each item
        const transformedData = data.map(item => {
            if (typeof item === 'object' && item !== null) {
                return {
                    month: item.month || 'Unknown',
                    income: typeof item.income === 'number' ? item.income : 0,
                    expense: typeof item.expense === 'number' ? item.expense : 0
                };
            }
            return null;
        }).filter(item => item !== null);

        return transformedData.length > 0 ? transformedData : createEmptyYearData();
    };

    // Helper function to create empty year data
    const createEmptyYearData = () => {
        const currentMonth = new Date().getMonth();
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const sampleData = [];
        
        for (let i = 0; i <= currentMonth; i++) {
            sampleData.push({
                month: monthLabels[i],
                income: 0,
                expense: 0
            });
        }
        
        return sampleData;
    };

    // ---------- Budgets ----------
    const addBudget = async (budget) => {
        try {
            await axios.post('/api/budgets', budget);
            toast.success('Budget added');
        } catch (error) {
            console.error('Add budget error:', error);
            toast.error('Add budget failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const getBudgets = async () => {
        try {
            const { data } = await axios.get('/api/budgets');
            setBudgets(data || []);

            if (data) {
                const used = data.map((item) => item.category);
                const available = defaultExpenseCategories.filter((cat) => !used.includes(cat));
                setExpenseCategory(available);
            }
        } catch (error) {
            console.error('Get budgets error:', error);
            return null;
        }
    };


    const updateBudget = async (id, updates) => {
        try {
            await axios.put(`/api/budgets/${id}`, updates);
            await getBudgets();
            toast.success('Budget updated');
        } catch {
            toast.error('Update budget failed');
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axios.delete(`/api/budgets/${id}`);
            await getBudgets();
            toast.success('Budget deleted');
        } catch {
            toast.error('Delete budget failed');
        }
    };

    const getBudgetUsage = async () => {
        try {
            const { data } = await axios.get('/api/budgets/status');
            setBudgetUsage(data || {
                total: { totalBudget: 0, totalSpent: 0, remaining: 0 },
                report: []
            });
        } catch (error) {
            console.error('Error fetching budget usage:', error);
            // Set default structure on error
            setBudgetUsage({
                total: { totalBudget: 0, totalSpent: 0, remaining: 0 },
                report: []
            });
        }
    };

    useEffect(() => {
        loadUser()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                await Promise.all([
                    getBudgets(),
                    fetchMonthlySummary(),
                    fetchSummary(),
                    getBudgetUsage(),
                    getTransactions()
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load some data. Please refresh the page.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user])

    return (
        <AppContext.Provider
            value={{
                user,
                navigate,
                yearData,
                setUser,
                register,
                login,
                loading,
                logout,
                statistic,
                addTransaction,
                getTransactions,
                deleteTransaction,
                addBudget,
                budgets,
                expenseCategory,
                getBudgets,
                updateBudget,
                deleteBudget,
                budgetUsage,
                getBudgetUsage,
                transactions,
                search,
                setSearch
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
export const useAppContext = () => useContext(AppContext);
