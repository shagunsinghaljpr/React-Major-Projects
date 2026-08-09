import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Orders from './components/Orders';
import './App.css';

function NavBar() {
  const { cart } = useCart();
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🛍️ ShopEasy</Link>
      <div className="nav-links">
        <Link to="/">Shop</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
