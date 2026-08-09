import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required
          onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email" required
          onChange={e => setForm({...form, email: e.target.value})} />
        <input type="password" placeholder="Password" required
          onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
