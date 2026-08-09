import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const items = cart.map(item => ({
      product: item._id, name: item.name, price: item.price, qty: item.qty
    }));
    await api.post('/orders', { items, total });
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) return <p className="center">Your cart is empty</p>;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart.map(item => (
        <div key={item._id} className="cart-row">
          <span className="emoji">{item.image}</span>
          <div className="info">
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
          <div className="qty-controls">
            <button onClick={() => updateQty(item._id, -1)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item._id, 1)}>+</button>
          </div>
          <span className="subtotal">${(item.price * item.qty).toFixed(2)}</span>
          <button onClick={() => removeFromCart(item._id)}>🗑️</button>
        </div>
      ))}
      <div className="cart-total">
        <h2>Total: ${total.toFixed(2)}</h2>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}
