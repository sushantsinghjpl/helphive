import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { useServices } from '../../context/ServiceContext';
import { bookingApi } from '../../services/api/bookingApi';
import { RevenueAreaChart, ServiceDistributionBar } from '../../components/admin/AdminCharts';
import { BookingStatus } from '../../types';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  ArrowRight,
  RotateCw,
  Eye
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { bookings, updateStatus } = useBookings();
  const { services } = useServices();

  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    cancellationRate: 0,
    totalProviders: 10,
    verifiedProviders: 9,
    totalCustomers: 15
  });

  useEffect(() => {
    bookingApi.getAdminStats().then(setStats);
  }, [bookings]);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    await updateStatus(bookingId, newStatus, `Updated via Admin Dashboard`);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Operations & Performance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time bookings, provider dispatches, and revenue analytics across India.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/services"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-sm"
          >
            Manage Services
          </Link>
          <Link
            to="/admin/bookings"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            All Bookings ({bookings.length})
          </Link>
        </div>
      </div>

      {/* 8 KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Total Bookings</span>
            <CalendarCheck className="w-4 h-4 text-brand-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">
            {stats.totalBookings}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            ↑ 18% vs last month
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Today's Dispatches</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-500 block">
            4
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Active in NCR & BLR
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Active Bookings</span>
            <Clock className="w-4 h-4 text-brand-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 block">
            {stats.activeBookings}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Scheduled / In Progress
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Completed Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 block">
            {stats.completedBookings}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            100% satisfaction score
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-teal-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            GST compliant invoices
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Total Customers</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">
            {stats.totalCustomers}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Registered accounts
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Verified Providers</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">
            {stats.verifiedProviders} / {stats.totalProviders}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Police cleared staff
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Cancellation Rate</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-rose-500 block">
            {stats.cancellationRate}%
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Under 5% industry benchmark
          </span>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Over Time Area Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                Revenue Growth (Monthly)
              </h3>
              <p className="text-xs text-slate-500">Gross platform transaction volume in INR</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
              +42% QoQ
            </span>
          </div>

          <RevenueAreaChart />
        </div>

        {/* Popular Services Breakdown */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              Service Distribution
            </h3>
            <p className="text-xs text-slate-500">Share of total customer bookings</p>
          </div>

          <ServiceDistributionBar />
        </div>

      </div>

      {/* Recent Bookings Live Table with Status Updator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Recent Bookings Feed
            </h3>
            <p className="text-xs text-slate-500">
              Live status coordinator view with quick lifecycle updater.
            </p>
          </div>

          <Link
            to="/admin/bookings"
            className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1"
          >
            <span>View All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                <th className="py-3 px-2">Booking ID</th>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Service</th>
                <th className="py-3 px-2">Assigned Staff</th>
                <th className="py-3 px-2">Date & Slot</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Lifecycle Status</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bookings.slice(0, 6).map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-2 font-mono font-bold text-slate-900 dark:text-white">
                    #{b.id}
                  </td>
                  <td className="py-3.5 px-2 font-medium text-slate-800 dark:text-slate-200">
                    {b.customer.name}
                    <span className="block text-[10px] text-slate-400">{b.customer.phone}</span>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="font-medium text-slate-900 dark:text-white">{b.serviceName}</span>
                    <span className="block text-[10px] text-slate-400">{b.planName}</span>
                  </td>
                  <td className="py-3.5 px-2 text-slate-600 dark:text-slate-300">
                    {b.provider?.name || 'Unassigned'}
                  </td>
                  <td className="py-3.5 px-2 text-slate-600 dark:text-slate-300">
                    {b.date}
                    <span className="block text-[10px] text-slate-400">{b.timeSlot}</span>
                  </td>
                  <td className="py-3.5 px-2 font-bold text-slate-900 dark:text-white">
                    ₹{b.pricing.total}
                  </td>
                  <td className="py-3.5 px-2">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                      className="text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border-0 px-2 py-1 text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="provider_assigned">Provider Assigned</option>
                      <option value="on_the_way">On The Way</option>
                      <option value="arrived">Arrived</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      to={`/track/${b.id}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 inline-block"
                      title="View Customer Tracking"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
