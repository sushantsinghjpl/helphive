import React from 'react';
import { Booking, BookingStatus } from '../../types';
import { CheckCircle2, Clock, MapPin, UserCheck, Play, CheckCheck, XCircle, RotateCw } from 'lucide-react';

interface BookingTimelineProps {
  booking: Booking;
  onAdvanceStatus?: () => void;
  showSimulateButton?: boolean;
}

export const BookingTimeline: React.FC<BookingTimelineProps> = ({
  booking,
  onAdvanceStatus,
  showSimulateButton = true
}) => {
  const stepsConfig: { status: BookingStatus; label: string; icon: any; description: string }[] = [
    { status: 'confirmed', label: 'Booking Confirmed', icon: CheckCircle2, description: 'Slot scheduled & payment verified' },
    { status: 'provider_assigned', label: 'Provider Assigned', icon: UserCheck, description: 'Verified assistant allocated' },
    { status: 'on_the_way', label: 'Provider On The Way', icon: MapPin, description: 'Assistant en route to destination' },
    { status: 'arrived', label: 'Provider Arrived', icon: Clock, description: 'Assistant checked in at location' },
    { status: 'in_progress', label: 'Service Started', icon: Play, description: 'Assistance actively underway' },
    { status: 'completed', label: 'Service Completed', icon: CheckCheck, description: 'All tasks safely concluded' },
  ];

  // Determine current active index in stepsConfig
  const getStepIndex = (st: BookingStatus) => {
    switch (st) {
      case 'pending': return -1;
      case 'confirmed': return 0;
      case 'provider_assigned': return 1;
      case 'on_the_way': return 2;
      case 'arrived': return 3;
      case 'in_progress': return 4;
      case 'completed': return 5;
      case 'cancelled': return -2;
      default: return 0;
    }
  };

  const activeIdx = getStepIndex(booking.status);

  if (booking.status === 'cancelled') {
    return (
      <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-6 text-center">
        <XCircle className="w-12 h-12 text-rose-500 mx-auto mb-2" />
        <h4 className="font-bold text-rose-700 dark:text-rose-400 text-lg">Booking Cancelled</h4>
        <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">
          This booking was cancelled. If you were charged, a full refund will reflect within 2-4 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Live Service Tracking
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Real-time status updates for Booking #{booking.id}
          </span>
        </div>

        {showSimulateButton && booking.status !== 'completed' && onAdvanceStatus && (
          <button
            onClick={onAdvanceStatus}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60 text-xs font-semibold transition active:scale-95 shadow-sm"
            title="Simulate provider moving to next status"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Simulate Next Step</span>
          </button>
        )}
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {stepsConfig.map((step, idx) => {
          const isDone = idx <= activeIdx;
          const isCurrent = idx === activeIdx;
          const isUpcoming = idx > activeIdx;
          const Icon = step.icon;

          return (
            <div key={step.status} className="relative flex items-start group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100 dark:ring-brand-950/80 shadow-md shadow-brand-500/20'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </div>

              {/* Step Content */}
              <div className="ml-3 sm:ml-4">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isCurrent
                        ? 'text-brand-600 dark:text-brand-400'
                        : isDone
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full animate-pulse">
                      In Progress
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {step.description}
                </p>

                {/* Show custom timeline timestamp/note if available */}
                {isDone && booking.timeline && (
                  <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    {booking.timeline.find(t => t.status === step.status)?.timestamp || 'Completed'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
