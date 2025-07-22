const express = require('express');
const router = express.Router();

// Example auth route
router.post('/login', (req, res) => {
  res.json({ message: 'Login route' });
});

module.exports = router;
