import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('No token provided for auth check');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.log('JWT verification failed:', err.message);
    res.status(401).json({ message: 'Not authorized' });
  }
};

export default auth;