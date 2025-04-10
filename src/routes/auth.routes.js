import express from 'express';
import { register, login} from '../controllers/auth.controller.js';

const router = express.Router();


console.log('Auth routes loaded');

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);

export default router;