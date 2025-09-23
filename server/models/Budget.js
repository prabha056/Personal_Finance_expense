import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  month: { type: Number, default: () => new Date().getMonth() + 1 },
  year: { type: Number, default: () => new Date().getFullYear() },
}, {
  timestamps: true
});

// Ensure unique category per user per month/year
BudgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model('Budget', BudgetSchema);