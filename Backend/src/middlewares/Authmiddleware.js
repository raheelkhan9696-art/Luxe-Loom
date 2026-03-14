import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Protect: Ensures the user is logged in
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header (Format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token using your JWT_SECRET from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB and attach to the Request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      res.status(401).json({ message: 'Not authorized, session expired' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token found' });
  }
};

/**
 * Admin: Ensures the authenticated user has administrative privileges
 */
export const admin = (req, res, next) => {
  // We check req.user because 'protect' middleware ran first and attached it
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Access Denied: Administrative credentials required' 
    });
  }
};