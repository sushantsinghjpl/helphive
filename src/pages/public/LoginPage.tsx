import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeartHandshake, Phone, Shield, ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { customer, isAdmin, sendOtp, verifyOtp, loginAdmin, quickDemoLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  // Toggle customer vs admin tab
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  // Customer OTP flow
  const [phone, setPhone] = useState('9871122334');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  // Admin login flow
  const [adminEmail, setAdminEmail] = useState('admin@helphive.in');
  const [adminPass, setAdminPass] = useState('admin123');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    await sendOtp(phone);
    setOtpSent(true);
    setOtp('123456'); // Pre-fill mock OTP for smooth demo evaluation
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await verifyOtp(otp);
    if (success) {
      navigate(redirect);
    } else {
      setError('Invalid OTP. Please enter 123456 for demo mode.');
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await loginAdmin(adminEmail, adminPass);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@helphive.in / admin123');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white flex items-center justify-center mx-auto shadow-md">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {role === 'customer' ? 'Sign in to HelpHive' : 'Admin Portal Login'}
          </h1>
          <p className="text-xs text-slate-500">
            {role === 'customer' ? 'Enter your mobile number to receive OTP' : 'Administrative staff credentials required'}
          </p>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setRole('customer'); setError(''); }}
            className={`py-2 rounded-lg transition ${
              role === 'customer'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => { setRole('admin'); setError(''); }}
            className={`py-2 rounded-lg transition ${
              role === 'admin'
                ? 'bg-white dark:bg-slate-900 text-amber-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Administrator
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Customer Phone & OTP Form */}
        {role === 'customer' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98711 22334"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
                >
                  Send Verification OTP
                </button>

                {/* Demo autofill shortcut */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      quickDemoLogin('customer');
                      navigate(redirect);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Login (Amitabh Sen)
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Enter 6-digit OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-brand-600 hover:underline"
                    >
                      Change Number
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    className="w-full tracking-widest text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-lg font-bold focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <p className="text-[11px] text-slate-400 text-center mt-1">
                    (Demo OTP is pre-filled: <span className="font-bold text-brand-600">123456</span>)
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
                >
                  Verify & Continue
                </button>
              </form>
            )}
          </div>
        )}

        {/* Admin Login Form */}
        {role === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">Demo credentials: admin@helphive.in / admin123</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition"
            >
              Sign In to Admin Portal
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
