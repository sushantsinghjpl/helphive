import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Booking } from '../../types';
import { InvoiceModal } from '../../components/booking/InvoiceModal';
import { getWhatsAppLink } from '../../services/whatsapp';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  Download,
  MessageCircle,
  Phone,
  ArrowRight,
  XCircle,
  Share2
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings, cancelBooking } = useBookings();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    if (bookings.length > 0 && id) {
      const found = bookings.find(b => b.id.toLowerCase() === id.toLowerCase());
      if (found) setBooking(found);
    }
  }, [bookings, id]);

  const handleCancel = async () => {
    if (!booking) return;
    if (confirm('Are you sure you want to cancel this booking? A 100% refund will be processed.')) {
      await cancelBooking(booking.id, 'Cancelled by customer');
      alert('Booking cancelled successfully.');
    }
  };

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Booking Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">Checking recent orders...</p>
        <Link to="/services" className="mt-4 inline-block px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold">
          Return to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Top Banner Card */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25 animate-fade-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
          Booking Confirmed & Escrow Secured
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          We're Ready to Assist!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          Your booking <span className="font-bold text-brand-600 dark:text-brand-400">#{booking.id}</span> is successfully confirmed. A regional coordinator is actively overseeing the assignment.
        </p>

        {/* Primary Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={`/track/${booking.id}`}
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
          >
            <span>Track Live Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setInvoiceOpen(true)}
            className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs sm:text-sm text-slate-800 dark:text-white transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>

      {/* Booking Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Booking Reference</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">#{booking.id}</span>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            {booking.status.toUpperCase().replace('_', ' ')}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 block">Service & Plan:</span>
            <span className="font-bold text-slate-900 dark:text-white block">{booking.serviceName}</span>
            <span className="text-slate-500">{booking.planName} ({booking.hours} hours)</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 block">Scheduled Date & Time:</span>
            <span className="font-bold text-slate-900 dark:text-white block">{booking.date}</span>
            <span className="text-slate-500">{booking.timeSlot}</span>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="text-xs text-slate-400 block">Meeting Point / Address:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200 block">{booking.customer.address}</span>
            {booking.customer.landmark && (
              <span className="text-xs text-slate-500">Landmark: {booking.customer.landmark}</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 block">Customer Contact:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200 block">{booking.customer.name}</span>
            <span className="text-slate-500">{booking.customer.phone}</span>
          </div>

          {booking.customer.patientName && (
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">Patient / Accompanied:</span>
              <span className="font-medium text-brand-600 dark:text-brand-400 block">{booking.customer.patientName}</span>
              {booking.customer.emergencyContact && (
                <span className="text-slate-500">Emergency: {booking.customer.emergencyContact}</span>
              )}
            </div>
          )}
        </div>

        {/* Assigned Provider Profile */}
        {booking.provider && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={booking.provider.photo}
                alt={booking.provider.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-500/30"
              />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
                  Assigned Assistant
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {booking.provider.name}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Police Verified • {booking.provider.rating}★</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${booking.provider.phone}`}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-brand-600 transition"
                title="Call Assistant"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink(`Hi ${booking.provider.name}, I am following up on HelpHive booking #${booking.id}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 transition"
                title="WhatsApp Assistant"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Amount Paid Breakdown & Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block">Total Amount Paid</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{booking.pricing.total}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block font-medium">
              Paid via {booking.payment.method.toUpperCase()} ({booking.payment.transactionId})
            </span>
          </div>

          <div className="flex items-center gap-3">
            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition"
              >
                Cancel Booking
              </button>
            )}

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
            >
              My Dashboard
            </Link>
          </div>
        </div>

      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        booking={booking}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />

    </div>
  );
};
