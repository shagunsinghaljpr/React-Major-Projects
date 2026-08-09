const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post('/seed', async (req, res) => {
  await Product.deleteMany({});
  const products = await Product.insertMany([
    { name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: '🎧', stock: 15 },
    { name: 'Smart Watch', price: 199.99, category: 'Electronics', image: '⌚', stock: 8 },
    { name: 'Running Shoes', price: 89.99, category: 'Fashion', image: '👟', stock: 20 },
    { name: 'Backpack', price: 49.99, category: 'Fashion', image: '🎒', stock: 12 },
    { name: 'Coffee Maker', price: 59.99, category: 'Home', image: '☕', stock: 10 },
    { name: 'Desk Lamp', price: 29.99, category: 'Home', image: '💡', stock: 25 },
  ]);
  res.json(products);
});

module.exports = router;
