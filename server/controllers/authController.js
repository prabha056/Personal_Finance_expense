import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development';
  console.log('JWT_SECRET available:', !!process.env.JWT_SECRET);
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  console.log('Registration attempt:', { name, email, password: password ? '***' : 'undefined' });
  
  // Validate required fields
  if (!name || !email || !password) {
    console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    console.log('User created successfully:', user._id);
    
    res.cookie('token', generateToken(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.cookie('token', generateToken(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
