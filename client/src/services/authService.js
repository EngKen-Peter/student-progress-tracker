import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async ({ name, email, password, role }) => {
  return axios.post(`${API_URL}/api/auth/register`, {
    name,
    email,
    password,
    role
  });
};

export const login = async ({ email, password }) => {
  return axios.post(`${API_URL}/api/auth/login`, {
    email,
    password
  });
};

// Add other auth-related API calls here, always using API_URL as the base 