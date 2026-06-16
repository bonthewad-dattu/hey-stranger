const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();


router.get('/search', auth, async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.json([]);
    }

    const regex = new RegExp(q, 'i');

    const users = await User.find({
      $or: [{ name: regex }, { username: regex }],
    })
      .select('name username avatarUrl bio')
      .limit(10);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:username', auth, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
