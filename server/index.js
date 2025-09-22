import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import auth from './middleware/authMiddleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      // Add your production domains here
      process.env.FRONTEND_URL,
      process.env.CLIENT_URL
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'API is running...', 
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API test endpoint working!', 
    port: PORT,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors_origins: process.env.FRONTEND_URL || 'http://localhost:5173'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', auth, transactionRoutes);
app.use('/api/budgets', auth, budgetRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origins: http://localhost:5173, http://localhost:3000`);
  console.log(`API endpoints available at: http://localhost:${PORT}/api/`);
});
