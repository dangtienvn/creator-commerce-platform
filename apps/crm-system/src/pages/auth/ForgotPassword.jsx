import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/auth/forgot', { email });
      setSuccess(true);
      toast.success('Email khôi phục đã được gửi. Vui lòng kiểm tra hộp thư của bạn.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Quên mật khẩu?
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {success 
              ? "Chúng tôi đã gửi link đặt lại mật khẩu vào email của bạn." 
              : "Đừng lo, hãy nhập email tài khoản của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu."}
          </p>
        </div>

        {!success ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Gửi link khôi phục"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <button
              onClick={() => { setSuccess(false); setEmail(''); }}
              className="w-full flex justify-center py-2.5 px-4 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Thử địa chỉ email khác
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang Đăng nhập
          </Link>
        </div>

      </div>
    </div>
  );
}
