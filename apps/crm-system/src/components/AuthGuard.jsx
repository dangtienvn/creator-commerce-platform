import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthGuard = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, loading } = useAuth();
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { state: { from: location } });
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        if (role === 'super_admin' || role === 'admin') {
          navigate('/admin/creators');
        } else {
          navigate('/');
        }
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    }
  }, [user, role, loading, navigate, location, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default AuthGuard;
