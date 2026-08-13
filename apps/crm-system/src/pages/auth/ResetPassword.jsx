import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { KeyRound, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/.test(form.password)) {
      setError("Mật khẩu phải từ 8 ký tự trở lên, chứa ít nhất một chữ hoa, một chữ thường và một ký tự đặc biệt.");
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/reset', { token, password: form.password });
      setSuccess(true);
      toast.success('Đặt lại mật khẩu thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50">
        
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <KeyRound className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Đặt lại mật khẩu
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {success ? "Tuyệt vời! Mật khẩu của bạn đã được cập nhật." : "Vui lòng nhập mật khẩu mới cho tài khoản của bạn."}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-sm text-slate-600">Đang chuyển hướng về trang Đăng nhập...</p>
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Nhập mật khẩu mới"
                  disabled={!token || loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Nhập lại mật khẩu mới"
                  disabled={!token || loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !token}
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Xác nhận đặt lại"}
              </button>
            </div>
          </form>
        )}

        {!success && (
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang Đăng nhập
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
