
import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import axios from 'axios';

const TaskEditModal = ({ task, visible, onCancel, onTaskUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/tasks/${task.id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onTaskUpdated(response.data); // Notify parent component about the update
      onCancel(); // Close modal
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <Modal
      title="Edit Task"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdateTask}>
          Update
        </Button>,
      ]}
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: '10px' }}
      />
    </Modal>
  );
};

export default TaskEditModal;
