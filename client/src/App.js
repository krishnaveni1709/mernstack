import React, { useEffect, useState } from 'react';
import api from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async (task) => {
    const res = await api.post('/tasks', task);
    setTasks(prev => [res.data, ...prev]);
  };

  const updateTask = async (id, patch) => {
    const res = await api.put(`/tasks/${id}`, patch);
    setTasks(prev => prev.map(t => t._id === id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>Task Dashboard</h1>
      </header>
      <main>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
      </main>
    </div>
  );
}
