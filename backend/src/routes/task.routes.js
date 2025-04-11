import express from 'express';
import { getTasks, createTask, deleteTask, updateTask } from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// DON'T add '/tasks' here again — already prefixed by app.use('/api/tasks', ...)
router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.delete('/:id', protect, deleteTask);
router.put('/:id', protect, updateTask); 

export default router;
