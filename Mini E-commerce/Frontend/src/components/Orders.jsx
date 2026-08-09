import { useState, useEffect } from 'react';
import api from '../api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="center">No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span>Order #{order._id.slice(-6)}</span>
              <span className={`status ${order.status}`}>{order.status}</span>
            </div>
            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <span>{item.name} x{item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">Total: ${order.total.toFixed(2)}</div>
          </div>
        ))
      )}
    </div>
  );
}
