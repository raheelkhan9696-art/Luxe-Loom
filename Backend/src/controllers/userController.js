import User from '../models/User.js';
import Client from '../models/Client.js';
import jwt from 'jsonwebtoken';

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// --- 1. REGISTER USER ---
// @desc    Register a new user & create their Client profile
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 1. Create the Auth User
    const user = await User.create({
      name,
      email,
      password, // Will be hashed by UserSchema pre-save hook
    });

    if (user) {
      // 2. Automatically create an empty Client Profile for CRM
      await Client.create({ user: user._id });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid user data', error: error.message });
  }
};

// --- 2. LOGIN USER ---
// @desc    Auth user & get token
// @route   POST /api/auth/login
export const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Attempt:", email);

  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    console.log("User not found in database");
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  console.log("Password Match Status:", isMatch);

  if (isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tier: user.tier,
      token: generateToken(user._id),
      message: 'Login successful' // Added message for clarity
    });
    
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// --- 3. GET USER PROFILE ---
// @desc    Get user profile & linked Client data
// @route   GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const clientData = await Client.findOne({ user: req.user._id });

    if (user) {
      res.json({
        user,
        clientData // This contains their addresses, preferences, and tier
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};