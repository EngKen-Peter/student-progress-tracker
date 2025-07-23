// routes/students.js
import express from 'express';
import Student from '../models/students.js';

const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST new student
router.post('/', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
});

// PUT (update) student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating student' });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student' });
  }
});

export default router;
