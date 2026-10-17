import React from 'react';
import { Link } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';
import { CheckCircle2, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { services } = useServices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          Fair & Transparent Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          No Hidden Fees. Pay Only for the Help You Need.
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          All our prices include background verification, assistant travel allowance, and 24/7 coordinator monitoring.
        </p>
      </div>

      {/* Services Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.filter(s => s.status === 'active').map(service => (
          <div
            key={service.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {service.category}
                </span>
                {service.popular && (
                  <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Popular
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {service.name}
              </h3>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  ₹{service.basePrice}
                </span>
                <span className="text-xs text-slate-500">
                  {service.pricingUnit || '/ hour'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                {service.shortDescription}
              </p>

              {/* Plans breakdown list */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">
                  Available Plans:
                </span>
                {service.plans.map(p => (
                  <div key={p.id} className="flex items-center justify-between text-xs py-1">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{p.name} ({p.hours}h)</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
              <Link
                to={`/booking?service=${service.slug}`}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Rules & Transparency FAQs */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Transparent Billing Policies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">Peak & Night Hours</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Bookings scheduled between 08:00 PM and 06:00 AM carry a 15% night compensation surcharge directly transferred to the field assistant.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">Cancellation & Refunds</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Cancel free of cost up to 2 hours before your scheduled slot for a 100% refund. Within 2 hours, a nominal ₹99 helper transit fee applies.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">Taxes & Invoicing</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              All bookings are GST-compliant with official tax invoices downloadable instantly from your dashboard.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
