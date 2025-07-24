const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET all progress (teachers only)
router.get('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const progress = await Progress.find().populate('lesson student teacher');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my progress (students)
router.get('/my', protect, authorize('student'), async (req, res) => {
  try {
    const progress = await Progress.find({ student: req.user._id }).populate('lesson student teacher');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET child's progress (parents)
router.get('/child/:childId', protect, authorize('parent'), async (req, res) => {
  try {
    const progress = await Progress.find({ student: req.params.childId }).populate('lesson student teacher');
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE progress (teachers only)
router.post('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const { lesson, student, status, feedback } = req.body;
    const progress = new Progress({ lesson, student, teacher: req.user._id, status, feedback });
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE progress (teachers and students)
router.put('/:id', protect, async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    if (!progress) return res.status(404).json({ message: 'Progress not found' });
    // Teachers can update any, students only their own
    if (req.user.role === 'teacher' || (req.user.role === 'student' && String(progress.student) === String(req.user._id))) {
      Object.assign(progress, req.body);
      await progress.save();
      // --- Socket.io emit ---
      const io = req.app.get('io');
      io.emit('progressUpdated', progress);
      // --- End Socket.io emit ---
      res.json(progress);
    } else {
      res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating progress' });
  }
});

module.exports = router;
