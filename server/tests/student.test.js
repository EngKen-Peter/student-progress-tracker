import request from 'supertest';
import app from '../server.js';

describe('Student API', () => {
  it('GET /api/students should return students', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
