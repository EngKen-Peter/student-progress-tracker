const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET all lessons (teachers only)
router.get('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('assignedTo createdBy');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my lessons (students)
router.get('/my', protect, authorize('student'), async (req, res) => {
  try {
    const lessons = await Lesson.find({ assignedTo: req.user._id }).populate('assignedTo createdBy');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my child's lessons (parents)
router.get('/child/:childId', protect, authorize('parent'), async (req, res) => {
  try {
    const lessons = await Lesson.find({ assignedTo: req.params.childId }).populate('assignedTo createdBy');
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE lesson (teachers only)
router.post('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const lesson = new Lesson({ title, description, assignedTo, createdBy: req.user._id });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE lesson (teachers only)
router.put('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    const updated = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating lesson' });
  }
});

// DELETE lesson (teachers only)
router.delete('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting lesson' });
  }
});

module.exports = router;
