import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { 
    createTask, 
    getTasks, 
    deleteTask 
} from '../controllers/task.controller.js';
import e from 'express';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route('/')
    .post(createTask) // Create a new task
    .get(getTasks); // Get all tasks

router.delete('/:id', deleteTask); // Delete a task by ID

export default router;
// Compare this snippet from src/controllers/task.controller.js:
