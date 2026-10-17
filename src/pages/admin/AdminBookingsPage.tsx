import React, { useState, useMemo } from 'react';
import { useBookings } from '../../context/BookingContext';
import { useServices } from '../../context/ServiceContext';
import { initialProviders } from '../../data/mockData';
import { Booking, BookingStatus, Provider } from '../../types';
import { Search, Filter, Calendar, MapPin, Eye, UserCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateStatus } = useBookings();
  const { services } = useServices();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      if (selectedStatus !== 'all' && b.status !== selectedStatus) return false;
      if (selectedService !== 'all' && b.serviceName !== selectedService) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          b.id.toLowerCase().includes(q) ||
          b.customer.name.toLowerCase().includes(q) ||
          b.customer.phone.includes(q) ||
          b.serviceName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [bookings, selectedStatus, selectedService, search]);

  const handleStatusChange = async (id: string, st: BookingStatus) => {
    await updateStatus(id, st, 'Status updated by administrator');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Bookings & Dispatch Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time control over all active, scheduled, and past customer bookings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Total: {bookings.length} Orders
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Booking ID, customer name, or phone..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="provider_assigned">Provider Assigned</option>
            <option value="on_the_way">On The Way</option>
            <option value="arrived">Arrived</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
          >
            <option value="all">All Services</option>
            {services.map(s => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-slate-400 font-semibold uppercase text-[11px]">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-3">Service & Plan</th>
                <th className="py-3.5 px-3">Customer Details</th>
                <th className="py-3.5 px-3">Schedule Slot</th>
                <th className="py-3.5 px-3">Assigned Staff</th>
                <th className="py-3.5 px-3">Payment</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    #{b.id}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 dark:text-white block">{b.serviceName}</span>
                    <span className="text-[11px] text-slate-400">{b.planName} ({b.hours}h)</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-slate-800 dark:text-slate-200 block">{b.customer.name}</span>
                    <span className="text-[11px] text-slate-400 block">{b.customer.phone}</span>
                    <span className="text-[10px] text-slate-400 truncate block max-w-xs">{b.customer.address}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                    <span className="font-medium">{b.date}</span>
                    <span className="block text-[11px] text-slate-400">{b.timeSlot}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                    {b.provider ? (
                      <div className="flex items-center gap-1.5">
                        <img src={b.provider.photo} alt={b.provider.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{b.provider.name}</span>
                      </div>
                    ) : (
                      <span className="text-amber-500 font-semibold">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                    ₹{b.pricing.total}
                    <span className="block text-[10px] text-emerald-600 uppercase font-normal">{b.payment.status}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                      className="text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border-0 px-2.5 py-1 text-slate-800 dark:text-slate-200 cursor-pointer"
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
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/track/${b.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 inline-block"
                      title="View Live Tracker"
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
