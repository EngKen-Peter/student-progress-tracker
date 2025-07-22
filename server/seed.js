// server/seed.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from './models/studentModel.js'

dotenv.config()

const students = [
  { name: 'Alice Smith', email: 'alice@example.com', progress: 80 },
  { name: 'Bob Johnson', email: 'bob@example.com', progress: 60 },
  { name: 'Carol White', email: 'carol@example.com', progress: 90 }
]

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Student.deleteMany()
    await Student.insertMany(students)
    console.log('✅ Sample student data inserted.')
    process.exit()
  } catch (err) {
    console.error('❌ Error seeding data:', err)
    process.exit(1)
  }
}

seedData()
