const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

router.get('/me', auth, async (req, res) => {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const posts = await Post.find({
      authorId: req.user.id,
      $or: [
        { isStory: true, createdAt: { $lte: twentyFourHoursAgo } },
        { createdAt: { $lte: thirtyDaysAgo } }
      ]
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;