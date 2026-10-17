import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { resetStorageToDefaults } from '../../services/api/storage';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Shield, User, RotateCcw, ExternalLink } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { customer, isAdmin, quickDemoLogin, logout } = useAuth();
  const { language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  const handleReset = () => {
    if (confirm('Reset all demo data (services, bookings, reviews) to initial defaults?')) {
      resetStorageToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-50 relative">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">
          <Sparkles className="w-3 h-3" /> Demo Mode
        </span>
        <span className="hidden sm:inline text-slate-400">
          Data-driven marketplace prototype with full public & admin functionality.
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {/* Language switch */}
        <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
          <button
            onClick={() => setLanguage('en')}
            className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${language === 'en' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${language === 'hi' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            हिन्दी
          </button>
        </div>

        {/* Quick Roles Switch */}
        <div className="flex items-center gap-1.5">
          {!isAdmin ? (
            <button
              onClick={() => {
                quickDemoLogin('admin');
                navigate('/admin/dashboard');
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 font-medium transition"
            >
              <Shield className="w-3 h-3" /> Switch to Admin
            </button>
          ) : (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition"
            >
              <Shield className="w-3 h-3" /> Admin Portal
            </Link>
          )}

          {!customer ? (
            <button
              onClick={() => {
                quickDemoLogin('customer');
                navigate('/dashboard');
              }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 border border-brand-500/30 font-medium transition"
            >
              <User className="w-3 h-3" /> Customer View
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-600 text-white font-medium hover:bg-brand-500 transition"
            >
              <User className="w-3 h-3" /> {customer.name.split(' ')[0]}'s Dashboard
            </Link>
          )}
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          title="Reset services, bookings & data to initial demo state"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 transition ml-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden md:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
