import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/users/my-profile');
        if (response.success) {
          setUser(response.data);
          // Standardize roles for our multi-tenant SaaS model
          // Usually roles come from backend (e.g., 'super_admin', 'creator')
          const userRole = response.data.role_name?.toLowerCase();
          
          // Map older roles to 'super_admin' or 'creator' for backwards compatibility
          if (userRole === 'admin' || userRole === 'super_admin') {
            setRole('super_admin');
          } else {
            setRole('creator');
          }
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
