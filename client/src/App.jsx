import React from 'react'
import UserLayout from './pages/UserLayout'
import Login from './pages/Login'
import Dashboard from './sections/Dashboard'
import AddTransaction from './sections/AddTransaction'
import Transactions from './sections/Transactions'
import Budgets from './sections/Budgets'
import SetBudgets from './sections/SetBudgets'
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/** Login route (public) */}
        <Route path='login' element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-transactions' element={<AddTransaction />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/set-budgets' element={<SetBudgets />} />
            <Route path='/transactions' element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
      {/** Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ErrorBoundary>
  )
}

export default App