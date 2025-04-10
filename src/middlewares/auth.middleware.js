import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ 
        message: 'Not authorized - No token' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const [user] = await pool.query(
      'SELECT id, email FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (!user[0]) {
      return res.status(401).json({ 
        message: 'Not authorized - User not found' 
      });
    }

    req.user = user[0];
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      message: 'Not authorized - Invalid token' 
    });
  }
};