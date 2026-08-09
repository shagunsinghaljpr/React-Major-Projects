import { useState, useEffect } from 'react';
import api from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', dueDate: '' });
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await api.post('/tasks', form);
    setForm({ title: '', description: '', priority: 'medium', dueDate: '' });
    setShowForm(false);
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  const columns = [
    { key: 'todo', label: '📋 To Do' },
    { key: 'in-progress', label: '⚡ In Progress' },
    { key: 'done', label: '✅ Done' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button onClick={() => setShowForm(!showForm)}>+ New Task</button>
      </div>

      {showForm && (
        <form className="task-form" onSubmit={addTask}>
          <input type="text" placeholder="Task title" required
            value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <textarea placeholder="Description" 
            value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <div className="form-row">
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
          </div>
          <button type="submit">Add Task</button>
        </form>
      )}

      <div className="board">
        {columns.map(col => (
          <div key={col.key} className="column">
            <h3>{col.label}</h3>
            {tasks.filter(t => t.status === col.key).map(task => (
              <div key={task._id} className={`task-card priority-${task.priority}`}>
                <h4>{task.title}</h4>
                {task.description && <p>{task.description}</p>}
                {task.dueDate && <span className="due-date">📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
                <div className="task-actions">
                  <select value={task.status} onChange={e => updateStatus(task._id, e.target.value)}>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <button onClick={() => deleteTask(task._id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
