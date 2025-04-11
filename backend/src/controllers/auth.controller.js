import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

export const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validation
      if (!username || !email || !password) {
        return res.status(400).json({ 
          message: 'Username, email and password are required' 
        });
      }
  
      // Check existing username
      const [existingUser] = await pool.query(
        'SELECT id FROM users WHERE username = ? OR email = ?', 
        [username, email]
      );
      
      if (existingUser.length > 0) {
        return res.status(400).json({ 
          message: 'Username or email already exists' 
        });
      }
  
      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 12);
      
        // Insert user into database
      const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
  
      // Generate JWT
      const token = jwt.sign(
        { userId: result.insertId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

        // Set cookie with JWT
  
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 3600000 // 1 hour
      });
  
      res.status(201).json({ 
        userId: result.insertId,
        username,
        email,
        created_at: new Date().toISOString()
      });
  
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Validation
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
        }
    
        // Check user in database
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (user.length === 0) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user[0].password);
        
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Generate JWT
        const token = jwt.sign(
          { userId: user[0].id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
    
        // Set cookie with JWT
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600000 // 1 hour
        });
    
        res.status(200).json({
          userId: user[0].id,
          username: user[0].username,
          email: user[0].email,
          created_at: user[0].created_at
        });
    
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
      }

};