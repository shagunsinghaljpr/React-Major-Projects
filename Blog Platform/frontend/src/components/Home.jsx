import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts').then(res => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="center">Loading posts...</p>;

  return (
    <div className="home">
      <h1>Latest Posts</h1>
      <div className="posts-grid">
        {posts.map(post => (
          <Link to={`/post/${post._id}`} key={post._id} className="post-card">
            <span className="category">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="post-meta">
              <span>By {post.author?.name}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
