import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '../../types';
import {
  HeartPulse,
  UserCheck,
  ShoppingBag,
  Car,
  Zap,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const renderServiceIcon = (iconName: string, className: string = 'w-6 h-6') => {
  switch (iconName.toLowerCase()) {
    case 'heartpulse':
    case 'hospital':
      return <HeartPulse className={className} />;
    case 'usercheck':
    case 'elderly':
      return <UserCheck className={className} />;
    case 'shoppingbag':
    case 'errands':
      return <ShoppingBag className={className} />;
    case 'car':
    case 'driver':
      return <Car className={className} />;
    case 'zap':
    case 'urgent':
      return <Zap className={className} />;
    default:
      return <Shield className={className} />;
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-brand-950/20 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image / Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

        {/* Popular / Custom Badge */}
        {service.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{service.badge}</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-sm border border-white/20">
          {service.category}
        </div>

        {/* Service Floating Icon & Name overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-600/90 backdrop-blur-md flex items-center justify-center text-white border border-brand-400/30 shadow-md">
              {renderServiceIcon(service.icon, 'w-5 h-5')}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight text-white drop-shadow-sm">
                {service.name}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Availability & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available Today</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{service.rating}</span>
              <span className="text-slate-400 font-normal">({service.reviewCount})</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Top 2 Features bullets */}
          <div className="mt-3 space-y-1.5">
            {service.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 block">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                  ₹{service.basePrice}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {service.pricingUnit || '/ hour'}
                </span>
              </div>
            </div>

            {service.plans && service.plans.length > 0 && (
              <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded">
                {service.plans.length} plans available
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/services/${service.slug}`}
              className="w-full text-center py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              View Details
            </Link>

            <Link
              to={`/booking?service=${service.slug}`}
              className="w-full text-center py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition shadow-sm flex items-center justify-center gap-1 group/btn"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
