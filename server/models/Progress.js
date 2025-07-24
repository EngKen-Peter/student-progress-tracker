const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who updated/assigned
  status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
  feedback: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
