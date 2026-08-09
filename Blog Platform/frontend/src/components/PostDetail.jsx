import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/posts/${id}`);
    navigate('/');
  };

  if (!post) return <p className="center">Loading...</p>;

  const isAuthor = user && post.author?._id === user.id;

  return (
    <div className="post-detail">
      <span className="category">{post.category}</span>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>By {post.author?.name}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="content">{post.content}</p>
      {isAuthor && (
        <button className="delete-btn" onClick={handleDelete}>Delete Post</button>
      )}
    </div>
  );
}
