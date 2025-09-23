# Personal Finance Manager

A full-stack personal finance management application built with React and Node.js.

## Features

- **User Authentication**: Secure login and registration
- **Transaction Management**: Add, view, and delete income/expense transactions
- **Budget Management**: Set monthly budgets for different categories
- **Dashboard**: Visual overview of financial data with charts
- **Budget Tracking**: Monitor spending against set budgets
- **Monthly Reports**: View income vs expense summaries

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts (for data visualization)
- React Hot Toast (notifications)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
Personal_Finance_expense/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React context providers
│   │   ├── pages/          # Main application pages
│   │   └── sections/       # Feature-specific components
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Personal_Finance_expense
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   - Copy `server/env.example` to `server/.env`
   - Update the MongoDB URI and JWT secret in `.env`

5. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/personal-finance-manager`

6. **Start the development servers**

   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Add new transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary/:year/:month` - Get monthly summary
- `GET /api/transactions/monthly-summary` - Get yearly income/expense data

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Add new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget
- `GET /api/budgets/status` - Get budget usage status

## Key Features Explained

### Budget Management
- Users can set monthly budgets for different expense categories
- Budgets are automatically associated with the current month/year
- Duplicate budgets for the same category in the same month are prevented
- Budget usage is calculated based on actual expenses

### Transaction Categories
Default expense categories include:
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Travel
- Other

### Data Visualization
- Pie charts for expense breakdown
- Line charts for monthly income vs expense trends
- Progress bars for budget usage

## Development Notes

- The application uses JWT tokens stored in HTTP-only cookies for authentication
- CORS is configured to allow requests from the frontend development server
- All API routes (except auth) require authentication
- Error handling includes proper HTTP status codes and user-friendly messages
- The database uses MongoDB with Mongoose for data modeling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
