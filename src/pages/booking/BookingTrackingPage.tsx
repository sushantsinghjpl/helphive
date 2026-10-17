import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookings } from '../../context/BookingContext';
import { Booking } from '../../types';
import { BookingTimeline } from '../../components/booking/BookingTimeline';
import { InvoiceModal } from '../../components/booking/InvoiceModal';
import { getWhatsAppLink } from '../../services/whatsapp';
import {
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  ArrowLeft,
  RotateCw,
  Download,
  AlertCircle
} from 'lucide-react';

export const BookingTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings, advanceStatus, cancelBooking, rateBooking } = useBookings();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  useEffect(() => {
    if (bookings.length > 0 && id) {
      const found = bookings.find(b => b.id.toLowerCase() === id.toLowerCase());
      if (found) setBooking(found);
    }
  }, [bookings, id]);

  const handleAdvance = async () => {
    if (!booking) return;
    try {
      const updated = await advanceStatus(booking.id);
      setBooking(updated);
    } catch (e) {
      console.error('Failed to advance status:', e);
    }
  };

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;
    await rateBooking(booking.id, ratingScore, ratingComment || 'Excellent and punctual assistance.');
    setRatingSubmitted(true);
  };

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Booking Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">Checking active dispatches...</p>
        <Link to="/dashboard" className="mt-4 inline-block px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Live Tracking: #{booking.id}
              </h1>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 uppercase">
                {booking.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {booking.serviceName} • {booking.planName} • Scheduled for {booking.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setInvoiceOpen(true)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tax Invoice</span>
          </button>

          <a
            href={getWhatsAppLink(`Hi HelpHive Coordinator, I am tracking booking #${booking.id} and need assistance.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Coordinator WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Timeline & Live Simulation */}
        <div className="lg:col-span-7 space-y-6">
          <BookingTimeline
            booking={booking}
            onAdvanceStatus={handleAdvance}
            showSimulateButton={true}
          />

          {/* Rating Modal/Form when completed */}
          {booking.status === 'completed' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Rate Your Assistant Experience
              </h3>

              {ratingSubmitted || booking.rating ? (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Thank you! Your feedback helps us maintain verified assistance standards.</span>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingScore(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition"
                      >
                        <Star className={`w-6 h-6 ${star <= ratingScore ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-2">
                      {ratingScore} out of 5
                    </span>
                  </div>

                  <textarea
                    rows={2}
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder="Share a quick review about punctuality, friendliness, or hospital help..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                  ></textarea>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Assigned Provider Card & Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Provider Card */}
          {booking.provider ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Assigned Personnel
              </span>

              <div className="flex items-center gap-4">
                <img
                  src={booking.provider.photo}
                  alt={booking.provider.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/40"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {booking.provider.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">{booking.provider.rating}</span>
                    <span>({booking.provider.reviewCount} tasks)</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                    {booking.provider.eta || '15 mins away from destination'}
                  </span>
                </div>
              </div>

              {/* Provider Badges */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="inline-flex items-center gap-1 bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded font-medium">
                  <ShieldCheck className="w-3 h-3" /> Police Verified
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                  {booking.provider.experienceYears} Years Exp
                </span>
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                  {booking.provider.languages.join(', ')}
                </span>
              </div>

              {/* Direct Call & WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${booking.provider.phone}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>Call Provider</span>
                </a>

                <a
                  href={getWhatsAppLink(`Hi ${booking.provider.name}, I am tracking booking #${booking.id} and waiting at ${booking.customer.address}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 dark:bg-amber-950/40 p-6 rounded-3xl border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-200 space-y-2">
              <span className="font-bold block text-sm">Assigning Nearest Assistant</span>
              <p>Our dispatch algorithm is allocating the closest verified assistant in your area.</p>
            </div>
          )}

          {/* Meeting Location & Patient Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Meeting Point & Details
            </h4>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-slate-900 dark:text-white block">{booking.customer.address}</span>
                  {booking.customer.landmark && <span className="text-slate-400">Landmark: {booking.customer.landmark}</span>}
                </div>
              </div>

              {booking.customer.patientName && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block">Patient Accompanied:</span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">{booking.customer.patientName}</span>
                </div>
              )}

              {booking.customer.specialInstructions && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block">Special Instructions:</span>
                  <p className="italic text-slate-500">{booking.customer.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      <InvoiceModal
        booking={booking}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />

    </div>
  );
};
