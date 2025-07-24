import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await apiLogin(email, password);
      setUser(res.data.user);
      setToken(res.data.token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return { success: false };
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    setError('');
    try {
      await apiRegister(name, email, password, role);
      // Optionally auto-login after register
      const loginRes = await login(email, password);
      setLoading(false);
      return loginRes;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 