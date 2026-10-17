import React, { useState } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  LayoutDashboard,
  Layers,
  CalendarCheck,
  Users,
  ShieldCheck,
  Tag,
  Star,
  HelpCircle,
  Settings,
  HeartHandshake,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  DollarSign
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Services', icon: Layers, path: '/admin/services' },
    { label: 'Bookings', icon: CalendarCheck, path: '/admin/bookings' },
    { label: 'Customers', icon: Users, path: '/admin/customers' },
    { label: 'Service Providers', icon: ShieldCheck, path: '/admin/providers' },
    { label: 'Pricing & Plans', icon: DollarSign, path: '/admin/pricing' },
    { label: 'Reviews', icon: Star, path: '/admin/reviews' },
    { label: 'FAQs', icon: HelpCircle, path: '/admin/faqs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      
      {/* Admin Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            H
          </div>
          <span className="font-extrabold text-base">HelpHive Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Logo */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <Link to="/admin/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
                  <HeartHandshake className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="font-extrabold text-base text-white block leading-tight">
                    Help<span className="text-amber-400">Hive</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Control Panel
                  </span>
                </div>
              </Link>

              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Nav Links */}
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Bottom user & switch to customer */}
          <div className="p-4 border-t border-slate-800 space-y-2">
            <Link
              to="/"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 transition"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
                <span>Public Website</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <div className="pt-2 flex items-center justify-between px-2">
              <div className="text-left">
                <span className="text-xs font-bold text-white block">Administrator</span>
                <span className="text-[10px] text-slate-500 truncate block max-w-[120px]">{adminEmail || 'admin@helphive.in'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {/* Desktop Admin Header Bar */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-800 dark:text-white">Admin Operations</span>
              <span>/</span>
              <span className="capitalize">Live Portal</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                ● Live Data Sync
              </span>
              <ThemeToggle />
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};
