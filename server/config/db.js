import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/personal-finance-manager';
    console.log('Attempting to connect to MongoDB:', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Make sure MongoDB is running and accessible');
    process.exit(1);
  }
};

export default connectDB;