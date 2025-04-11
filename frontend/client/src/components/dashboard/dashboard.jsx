import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';
import './dashboard.css';

const statuses = ['todo', 'in-progress', 'done'];

const Dashboard = () => {
  const [columns, setColumns] = useState({
    todo: [],
    'in-progress': [],
    done: [],
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/tasks', {
        withCredentials: true,
      });
      const grouped = { todo: [], 'in-progress': [], done: [] };
      res.data.forEach((task) => {
        const status = task.status || 'todo';
        grouped[status].push(task);
      });
      setColumns(grouped);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const handleAddTask = async () => {
    if (!title) return;
    try {
      await axios.post(
        'http://localhost:3000/api/tasks',
        { title, description, status: 'todo' },
        { withCredentials: true }
      );
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error(
        'Error adding task:',
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleEditTask = async () => {
    if (!title) return;
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${editingTaskId}`,
        { title, description },
        { withCredentials: true }
      );
      setIsEditing(false);
      setEditingTaskId(null);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error(
        'Error updating task:',
        error.response?.data || error.message
      );
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedTask] = sourceCol.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    destCol.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });

    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${draggableId}`,
        {
          title: movedTask.title,
          description: movedTask.description,
          status: movedTask.status,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error('Drag update failed:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <h1>Kanban Dashboard</h1>
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

      <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-columns">
  {statuses.map((status) => (
    <Droppable droppableId={status} key={status}>
      {(provided) => (
        <div
          className="kanban-column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{status.toUpperCase()}</h3>
          {columns[status].map((task, index) => (
            <Draggable
              key={task.id.toString()}
              draggableId={task.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  className="task-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  <b>{task.title}</b>
                  <p>{task.description}</p>
                  <button onClick={() => handleEditClick(task)}>✏️</button>
                  <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ))}
</div>

      </DragDropContext>

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
