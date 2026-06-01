import React from 'react';

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task card">
          <div>
            <div className="title">{task.title}</div>
            <div className="meta">{task.description}</div>
            <div className="meta">{task.dueDate ? new Date(task.dueDate).toLocaleString() : ''}</div>
          </div>
          <div className="actions">
            <div className={`pill ${task.status.replace(' ', '-')}`}>{task.status}</div>
            <select value={task.status} onChange={e => onUpdate(task._id, { status: e.target.value })}>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button className="btn ghost" onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
