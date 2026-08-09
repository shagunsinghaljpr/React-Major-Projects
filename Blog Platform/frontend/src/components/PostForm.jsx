import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function PostForm() {
  const [form, setForm] = useState({ title: '', content: '', category: 'General' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/posts', form);
    navigate(`/post/${res.data._id}`);
  };

  return (
    <div className="post-form">
      <h2>Write a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" required
          onChange={e => setForm({...form, title: e.target.value})} />
        <select onChange={e => setForm({...form, category: e.target.value})}>
          <option>General</option>
          <option>Technology</option>
          <option>Lifestyle</option>
          <option>Travel</option>
        </select>
        <textarea placeholder="Write your content..." rows="10" required
          onChange={e => setForm({...form, content: e.target.value})} />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
