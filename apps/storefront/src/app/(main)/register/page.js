'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, ArrowRight } from 'lucide-react';

export default function CreatorRegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).{8,}$/.test(form.password)) {
      setError("Mật khẩu phải từ 8 ký tự trở lên, chứa ít nhất một chữ hoa, một chữ thường và một ký tự đặc biệt.");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: 'creator' }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = 'http://localhost:3001/login';
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-md w-full space-y-10 bg-white p-10 md:p-12 rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-black tracking-tighter uppercase">
            Start Selling
          </h2>
          <p className="mt-3 text-base text-gray-600 font-medium">
            Join the platform that puts creators first.
          </p>
        </div>

        {error && (
          <div className="bg-black text-white p-4 text-sm font-bold text-center border-2 border-black">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-white text-black p-8 text-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="font-extrabold text-xl uppercase tracking-tight">Welcome Aboard!</h3>
            <p className="text-sm font-medium text-gray-600">Please check your email to verify your account.</p>
            <p className="text-sm text-black font-bold animate-pulse pt-2">Redirecting to your CRM...</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="appearance-none block w-full px-4 py-3.5 border-2 border-gray-200 focus:border-black rounded-none text-base transition-colors focus:outline-none focus:ring-0 placeholder-gray-400 font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="appearance-none block w-full px-4 py-3.5 border-2 border-gray-200 focus:border-black rounded-none text-base transition-colors focus:outline-none focus:ring-0 placeholder-gray-400 font-medium"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="appearance-none block w-full px-4 py-3.5 border-2 border-gray-200 focus:border-black rounded-none text-base transition-colors focus:outline-none focus:ring-0 placeholder-gray-400 font-medium"
                  placeholder="0123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  className="appearance-none block w-full px-4 py-3.5 border-2 border-gray-200 focus:border-black rounded-none text-base transition-colors focus:outline-none focus:ring-0 placeholder-gray-400 font-medium"
                  placeholder="Min 8 characters"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border-2 border-black text-base font-bold text-white bg-black hover:bg-white hover:text-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center pt-6">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        </div>

      </div>
    </div>
  );
}

