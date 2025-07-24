import axios from 'axios';

const API_URL = '/api/students';

export const getStudents = (token) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const createStudent = (student, token) =>
  axios.post(API_URL, student, { headers: { Authorization: `Bearer ${token}` } });

export const updateStudent = (id, student, token) =>
  axios.put(`${API_URL}/${id}`, student, { headers: { Authorization: `Bearer ${token}` } });

export const deleteStudent = (id, token) =>
  axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
