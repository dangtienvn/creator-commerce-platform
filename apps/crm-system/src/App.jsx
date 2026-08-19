import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Products from './pages/creator/Products';
import Orders from './pages/creator/Orders';
import Customers from './pages/creator/Customers';
import Dashboard from './pages/creator/Dashboard';
import Profile from './pages/creator/Profile';
import Reports from './pages/creator/Reports';
import Categories from './pages/creator/Categories';
import Posts from './pages/creator/Posts';
import Settings from './pages/creator/Settings';

// Admin Pages
import TenantManagement from './pages/admin/TenantManagement';
import ProductModeration from './pages/admin/ProductModeration';
import Payouts from './pages/admin/Payouts';
import PlatformAnalytics from './pages/admin/PlatformAnalytics';
import GlobalSettings from './pages/admin/GlobalSettings';

import AuthGuard from './components/AuthGuard';
import ErrorBoundary from './components/ErrorBoundary';

import api from './lib/api';
import toast from 'react-hot-toast';
import socket from './lib/socket';

import Login from './pages/auth/Login';

function App() {
  useEffect(() => {
    socket.on('NEW_ORDER', (orderData) => {
      toast.success(`Có đơn hàng mới vừa được đặt! Mã đơn: #${orderData?.id || 'New'}`, {
        duration: 5000,
        position: 'top-right',
        style: {
          border: '1px solid #3b82f6',
          padding: '16px',
          color: '#1e293b',
        },
        iconTheme: {
          primary: '#3b82f6',
          secondary: '#fff',
        },
      });
    });

    return () => {
      socket.off('NEW_ORDER');
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AuthGuard allowedRoles={['super_admin']}>
              <ErrorBoundary>
                <AdminLayout />
              </ErrorBoundary>
            </AuthGuard>
          }>
            <Route path="creators" element={<TenantManagement />} />
            <Route path="moderation" element={<ProductModeration />} />
            <Route path="payouts" element={<Payouts />} />
            <Route path="analytics" element={<PlatformAnalytics />} />
            <Route path="settings" element={<GlobalSettings />} />
          </Route>

          {/* Creator Routes */}
          <Route path="/" element={
            <AuthGuard allowedRoles={['creator']}>
              <ErrorBoundary>
                <AdminLayout />
              </ErrorBoundary>
            </AuthGuard>
          }>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="posts" element={<Posts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
