const express = require('express');
const MenuItem = require('../models/MenuItem');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST (Create) a menu item
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, ingredients } = req.body;
  try {
    const menuItem = new MenuItem({ name, description, price, ingredients });
    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT (Update) a menu item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a menu item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
