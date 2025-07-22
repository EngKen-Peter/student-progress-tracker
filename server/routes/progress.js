const express = require('express');
const router = express.Router();

// Example progress route
router.get('/', (req, res) => {
  res.json({ message: 'Get progress' });
});

module.exports = router;
