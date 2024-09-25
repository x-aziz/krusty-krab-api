const express = require('express');
const connectDB = require('./db');
const path = require('path');
const app = express();

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menuItems'));

// Main pages
app.get('/', (req, res) => res.render('index'));
app.get('/shop', async (req, res) => {
  const MenuItem = require('./models/MenuItem');
  const menuItems = await MenuItem.find();
  res.render('shop', { menuItems });
});
app.get('/login', (req, res) => res.render('login'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
