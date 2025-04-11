import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/tasks', { withCredentials: true });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const handleAddTask = async () => {
    if (!title) return;
    try {
      await axios.post('http://localhost:3000/api/tasks', { title, description }, { withCredentials: true });
      fetchTasks();
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleEditTask = async () => {
    if (!title) return;
    try {
      const res = await axios.put(
        `http://localhost:3000/api/tasks/${editingTaskId}`,
        { title, description },
        { withCredentials: true }
      );
      console.log(res.data.message);

      setIsEditing(false);
      setEditingTaskId(null);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Tasks</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      {!isEditing ? (
        <button onClick={handleAddTask}>Add Task</button>
      ) : (
        <button onClick={handleEditTask}>Update Task</button>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <b>{task.title}</b> - {task.description}
            <button onClick={() => handleEditClick(task)}>✏️ Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
