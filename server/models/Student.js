const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to Parent (User)
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to Teacher (User)
  class: { type: String },
  age: { type: Number },
  additionalInfo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
