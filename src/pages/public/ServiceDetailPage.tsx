import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';
import { Service, DurationPlan } from '../../types';
import { renderServiceIcon } from '../../components/cards/ServiceCard';
import { ReviewCard } from '../../components/cards/ReviewCard';
import { initialReviews } from '../../data/mockData';
import { getWhatsAppLink } from '../../services/whatsapp';
import {
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Share2
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, loading } = useServices();
  const navigate = useNavigate();

  const [service, setService] = useState<Service | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DurationPlan | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  useEffect(() => {
    if (services.length > 0) {
      const found = services.find(s => s.slug === slug);
      if (found) {
        setService(found);
        setSelectedPlan(found.plans.find(p => p.popular) || found.plans[0]);
      }
    }
  }, [slug, services]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Service Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">
          The requested service could not be located or may have been updated.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-block px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold"
        >
          View All Services
        </Link>
      </div>
    );
  }

  // Filter relevant reviews for this service
  const serviceReviews = initialReviews.filter(r => r.serviceId === service.id || r.serviceName === service.name);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Banner Header */}
      <div className="relative bg-slate-900 text-white py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover filter blur-sm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 px-3 py-1 rounded-full">
                {service.category}
              </span>
              {service.badge && (
                <span className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {service.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {service.name}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{service.rating}</span>
                <span className="text-slate-400 font-normal">({service.reviewCount} verified reviews)</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Police Verified Companions</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (Details, What's Included, Plans, FAQs) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. What's Included vs Excluded */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Scope of Assistance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>What's Included</span>
                  </div>
                  <ul className="space-y-2.5">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                    <XCircle className="w-4 h-4" />
                    <span>What's Not Included</span>
                  </div>
                  <ul className="space-y-2.5">
                    {service.exclusions.map((excl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{excl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Available Duration / Pricing Plans (DATA-DRIVEN) */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Available Duration Plans
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Select a duration that matches your requirement. Plans are managed dynamically without code edits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.plans.map(plan => {
                  const isSelected = selectedPlan?.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-brand-50/60 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 dark:text-white text-base">
                          {plan.name}
                        </span>
                        {plan.savingsPercent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                            Save {plan.savingsPercent}%
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1 my-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">
                          ₹{plan.price}
                        </span>
                        <span className="text-xs text-slate-400">
                          / {plan.hours} hour{plan.hours > 1 ? 's' : ''}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {plan.description || `${plan.hours} hours of dedicated hands-on assistance.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. How this specific service works */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                How {service.name} Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="font-bold text-brand-600 block">Step 1: Booking</span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Schedule online with hospital name, room/entry gate, and timing.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-brand-600 block">Step 2: Coordination</span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Nearest background-checked assistant is dispatched and checks in via OTP.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-brand-600 block">Step 3: Complete Support</span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Wheelchair pushing, queue tokens, lab reports, pharmacy runs & WhatsApp updates.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Service Specific FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Common Questions about {service.name}
                </h3>
                <div className="space-y-2.5">
                  {service.faqs.map((faq, idx) => {
                    const isExp = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaq(isExp ? null : idx)}
                          className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExp ? 'rotate-180 text-brand-600' : ''}`} />
                        </button>
                        {isExp && (
                          <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. Customer Reviews for this service */}
            {serviceReviews.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Customer Experiences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceReviews.map(r => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs text-slate-400 block font-medium">Selected Plan</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {selectedPlan?.name || service.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ₹{selectedPlan?.price || service.basePrice}
                  </span>
                  <span className="text-xs text-slate-500">
                    for {selectedPlan?.hours || 1} hour{(selectedPlan?.hours || 1) > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Quick Perks */}
              <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free cancellation up to 2 hours before</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Assigned assistant with police verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real-time photo updates & status tracking</span>
                </div>
              </div>

              {/* Primary Booking CTA */}
              <div className="space-y-3">
                <Link
                  to={`/booking?service=${service.slug}&plan=${selectedPlan?.id || ''}`}
                  className="w-full py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getWhatsAppLink(`Hi HelpHive, I would like to inquire about booking ${service.name} (${selectedPlan?.name || ''}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400">
                  Instant confirmation • No surge in normal hours
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
