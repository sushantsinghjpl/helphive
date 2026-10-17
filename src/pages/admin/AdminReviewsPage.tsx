import React, { useState } from 'react';
import { initialReviews } from '../../data/mockData';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../../services/api/storage';
import { Review } from '../../types';
import { Star, CheckCircle, EyeOff, Trash2, Search, CheckCircle2 } from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    return getStoredData<Review[]>(STORAGE_KEYS.REVIEWS, initialReviews);
  });

  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = reviews.filter(r => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  const handleUpdateStatus = (id: string, newStatus: 'approved' | 'hidden') => {
    const updated = reviews.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setReviews(updated);
    setStoredData(STORAGE_KEYS.REVIEWS, updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this customer review permanently?')) {
      const updated = reviews.filter(r => r.id !== id);
      setReviews(updated);
      setStoredData(STORAGE_KEYS.REVIEWS, updated);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Customer Reviews & Ratings Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Approve, hide, or remove reviews. Only approved reviews appear on public service detail pages.
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option value="all">All Reviews ({reviews.length})</option>
          <option value="approved">Approved Only</option>
          <option value="hidden">Hidden Only</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map(r => (
          <div
            key={r.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{r.customerName}</span>
                <span className="text-xs text-slate-400">({r.customerLocation})</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  r.status === 'approved'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {r.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                "{r.comment}"
              </p>

              <div className="text-xs text-slate-400">
                Service: <strong className="text-slate-600 dark:text-slate-300">{r.serviceName}</strong> • {r.date}
                {r.providerName && (
                  <span> • Assisted by: <strong className="text-brand-600 dark:text-brand-400">{r.providerName}</strong></span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {r.status !== 'approved' ? (
                <button
                  onClick={() => handleUpdateStatus(r.id, 'approved')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => handleUpdateStatus(r.id, 'hidden')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Hide
                </button>
              )}

              <button
                onClick={() => handleDelete(r.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Delete Review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
