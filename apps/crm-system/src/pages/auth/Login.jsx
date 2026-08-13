import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LayoutDashboard, Loader2 } from 'lucide-react';
import api from '../../lib/api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.success && response.token) {
        if (rememberMe) {
          localStorage.setItem('token', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
        }
        
        const role = response.user?.role_name?.toLowerCase();
        if (role === 'admin' || role === 'super_admin') {
          window.location.href = '/admin/creators';
        } else {
          window.location.href = '/';
        }
      } else {
        setError(response.message || 'Đăng nhập thất bại.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi trong quá trình đăng nhập.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Nửa bên trái: Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12 sm:px-12 lg:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              CRM<span className="text-blue-600">System</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn để tiếp tục.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input 
                name="email" 
                type="email" 
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 bg-slate-50 focus:bg-white" 
                placeholder="Nhập email của bạn"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12 text-slate-900 bg-slate-50 focus:bg-white" 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all disabled:opacity-70 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>

      {/* Nửa bên phải: Hình nền / Slogan */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Background gradient/pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-center p-12 lg:p-24">
          <div className="w-24 h-24 bg-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
            <LayoutDashboard size={48} className="text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Nền tảng quản lý <br/>
            <span className="text-blue-400">sáng tạo không giới hạn</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-lg">
            Tối ưu hóa quy trình bán hàng, phân tích dữ liệu chuyên sâu và mang lại trải nghiệm tốt nhất cho người dùng của bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
