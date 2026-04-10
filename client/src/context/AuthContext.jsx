import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const savedUserData = localStorage.getItem('user');
        if (savedUserData && savedUserData !== 'undefined') {
          const savedUser = JSON.parse(savedUserData);
          if (savedUser) {
            setUser(savedUser);
          }
        }
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      // Clean up corrupted storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const login = async (role, credentials) => {
    try {
      let endpoint = '';
      switch(role) {
        case 'admin': endpoint = '/api/auth/admin/login'; break;
        case 'student': endpoint = '/api/auth/student/login'; break;
        case 'counsellor': endpoint = '/api/auth/counsellor/login'; break;
        default: throw new Error('Invalid role');
      }

      const response = await axios.post(`${API_BASE}${endpoint}`, credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.clear(); // Clear everything to be safe
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/'; // Hard redirect to clean all state/memory
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
