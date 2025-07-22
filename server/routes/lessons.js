const express = require('express');
const router = express.Router();

// Example lesson route
router.get('/', (req, res) => {
  res.json({ message: 'Get lessons' });
});

module.exports = router;
