// server/models/studentModel.js
import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  progress: Number,
})

const Student = mongoose.model('Student', studentSchema)
export default Student
