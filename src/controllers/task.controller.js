import { pool } from '../config/db.js';

export const getTasks = async (req, res) => {
  try {
    const [tasks] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ?',
      [req.user.id]
    );
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [req.user.id, title, description]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};