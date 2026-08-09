import { useState, useEffect } from 'react';
import api from '../api';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = category === 'All' ? products : products.filter(p => p.category === category);

  return (
    <div className="shop">
      <div className="categories">
        {categories.map(cat => (
          <button key={cat} className={category === cat ? 'active' : ''} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="stock">{product.stock} in stock</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
