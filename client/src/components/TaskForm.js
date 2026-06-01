import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, dueDate: dueDate || null });
    setTitle(''); setDescription(''); setDueDate('');
  };

  return (
    <form className="task-form card" onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button className="btn" type="submit">Add Task</button>
    </form>
  );
}
