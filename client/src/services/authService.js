import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const register = async (userData) => {
  return axios.post(`${API_URL}/api/auth/register`, userData);
};

export const login = async (userData) => {
  return axios.post(`${API_URL}/api/auth/login`, userData);
};

// Add other auth-related API calls here, always using API_URL as the base 