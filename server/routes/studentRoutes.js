const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { protect, authorize } = require('../middleware/authMiddleware');

// GET all students (teachers only)
router.get('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const students = await Student.find().populate('user parent teacher');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my children (parents only)
router.get('/my-children', protect, authorize('parent'), async (req, res) => {
  try {
    const children = await Student.find({ parent: req.user._id }).populate('user parent teacher');
    res.json(children);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET my profile (students only)
router.get('/me', protect, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id }).populate('user parent teacher');
    if (!student) return res.status(404).json({ message: 'Student profile not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE student (teachers only)
router.post('/', protect, authorize('teacher'), async (req, res) => {
  try {
    const { name, email, class: className, age, additionalInfo, parentEmail } = req.body;
    // Check if user already exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create user with a default password
      user = new User({
        name,
        email,
        password: await bcrypt.hash('password123', 10),
        role: 'student',
      });
      await user.save();
    }
    let parent = null;
    if (parentEmail) {
      parent = await User.findOne({ email: parentEmail, role: 'parent' });
    }
    const student = new Student({
      user: user._id,
      teacher: req.user._id,
      parent: parent ? parent._id : undefined,
      class: className,
      age,
      additionalInfo,
    });
    await student.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { students: user._id } });
    if (parent) await User.findByIdAndUpdate(parent._id, { $push: { children: user._id } });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE student (teachers only)
router.put('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    const { parentEmail, ...updateFields } = req.body;
    let parent = null;
    if (parentEmail) {
      parent = await User.findOne({ email: parentEmail, role: 'parent' });
      if (parent) updateFields.parent = parent._id;
    }
    const updated = await Student.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating student' });
  }
});

// DELETE student (teachers only)
router.delete('/:id', protect, authorize('teacher'), async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student' });
  }
});

module.exports = router;
