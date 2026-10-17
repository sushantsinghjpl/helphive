import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingContext';
import { Booking, BookingStatus } from '../../types';
import { InvoiceModal } from '../../components/booking/InvoiceModal';
import { renderServiceIcon } from '../../components/cards/ServiceCard';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  FileText,
  User,
  Plus,
  ArrowRight,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { customer, logout } = useAuth();
  const { bookings, cancelBooking } = useBookings();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'active' | 'completed' | 'cancelled'>('upcoming');
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<Booking | null>(null);

  // Compute Customer stats
  const activeBookings = bookings.filter(b => ['confirmed', 'provider_assigned', 'on_the_way', 'arrived', 'in_progress'].includes(b.status));
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const totalSpent = bookings
    .filter(b => b.payment.status === 'paid' && b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.pricing.total, 0);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['on_the_way', 'arrived', 'in_progress'].includes(b.status);
    if (activeTab === 'upcoming') return ['confirmed', 'provider_assigned'].includes(b.status);
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Top Welcome Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-brand-500/20">
            {customer?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Welcome, {customer?.name || 'Amitabh Sen'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {customer?.phone || '+91 98711 22334'} • {customer?.email || 'amitabh.sen@gmail.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Service</span>
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Upcoming Bookings
          </span>
          <span className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 mt-2 block">
            {activeBookings.length}
          </span>
          <span className="text-[11px] text-slate-500">Scheduled / On-way</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Completed Tasks
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2 block">
            {completedBookings.length}
          </span>
          <span className="text-[11px] text-slate-500">Successfully assisted</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Spent
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 block">
            ₹{totalSpent}
          </span>
          <span className="text-[11px] text-slate-500">Across all bookings</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Cancelled
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-500 mt-2 block">
            {cancelledBookings.length}
          </span>
          <span className="text-[11px] text-slate-500">Full refunds processed</span>
        </div>
      </div>

      {/* Bookings Section with Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              My Bookings
            </h2>
            <p className="text-xs text-slate-500">
              View and track all your past and scheduled assistance services.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto">
            {(['upcoming', 'active', 'completed', 'cancelled', 'all'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map(b => (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                    {renderServiceIcon(b.serviceIcon || 'heartpulse', 'w-6 h-6')}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {b.serviceName}
                      </h3>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        #{b.id}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      {b.planName} • {b.date} ({b.timeSlot})
                    </p>

                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-md">{b.customer.address}</span>
                    </div>

                    {b.provider && (
                      <span className="text-xs text-brand-600 dark:text-brand-400 block pt-0.5">
                        Assigned Helper: <strong className="text-slate-800 dark:text-slate-200">{b.provider.name}</strong> ({b.provider.rating}★)
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action buttons & status */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left md:text-right">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                      ₹{b.pricing.total}
                    </span>
                    <span className="text-[11px] uppercase font-bold text-brand-600 dark:text-brand-400">
                      {b.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInvoiceBooking(b)}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="View Tax Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <Link
                      to={`/track/${b.id}`}
                      className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-sm transition flex items-center gap-1"
                    >
                      <span>Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">
              No bookings under "{activeTab}"
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              You do not have any bookings matching this category.
            </p>
            <Link
              to="/booking"
              className="mt-4 inline-block px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold"
            >
              Book a Service
            </Link>
          </div>
        )}
      </div>

      {/* Saved Addresses Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Saved Service Addresses
          </h3>
          <span className="text-xs text-brand-600 font-semibold cursor-pointer hover:underline">
            + Add New Address
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {customer?.savedAddresses?.map(addr => (
            <div key={addr.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">{addr.label}</span>
              <p className="text-slate-600 dark:text-slate-400">{addr.address}</p>
              <span className="text-slate-400">{addr.city} - {addr.pincode}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedInvoiceBooking && (
        <InvoiceModal
          booking={selectedInvoiceBooking}
          isOpen={!!selectedInvoiceBooking}
          onClose={() => setSelectedInvoiceBooking(null)}
        />
      )}

    </div>
  );
};
