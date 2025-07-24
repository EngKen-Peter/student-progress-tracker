const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');

let token;

beforeAll(async () => {
  // Connect to test DB
  await mongoose.connect(process.env.MONGO_URI);
  // Create a teacher user and get token
  await User.deleteMany({});
  await Student.deleteMany({});
  await request(app).post('/api/auth/register').send({
    name: 'Test Teacher',
    email: 'teacher@test.com',
    password: 'password123',
    role: 'teacher',
  });
  const res = await request(app).post('/api/auth/login').send({
    email: 'teacher@test.com',
    password: 'password123',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Student API', () => {
  it('should create a student', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Student1', email: 'student1@test.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all students', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fail to create student without name', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: 'fail@test.com' });
    expect(res.statusCode).toBe(400);
  });
});
