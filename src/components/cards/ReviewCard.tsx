import React from 'react';
import { Review } from '../../types';
import { Star, CheckCircle, Quote } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative flex flex-col justify-between">
      <Quote className="w-8 h-8 text-brand-200 dark:text-brand-900/40 absolute top-4 right-4 pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300 dark:text-slate-700'
              }`}
            />
          ))}
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 ml-1.5">
            {review.rating}.0
          </span>
        </div>

        {/* Comment Text */}
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4 italic">
          "{review.comment}"
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-900 dark:text-white text-sm">
              {review.customerName}
            </span>
            <span title="Verified Customer">
              <CheckCircle className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {review.customerLocation} • {review.serviceName}
          </span>
        </div>

        {review.providerName && (
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Assisted by</span>
            <span className="text-xs font-medium text-brand-600 dark:text-brand-400">
              {review.providerName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
