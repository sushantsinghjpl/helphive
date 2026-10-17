import React from 'react';
import { Provider } from '../../types';
import { ShieldCheck, Star, MapPin, Globe, CheckCircle, Award } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={provider.photo}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/30"
              loading="lazy"
            />
            {provider.verificationStatus === 'verified' && (
              <div className="absolute -bottom-1 -right-1 bg-brand-600 text-white rounded-full p-0.5 shadow-sm" title="Verified Provider">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {provider.name}
              </h4>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                provider.availability === 'available'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
              }`}>
                {provider.availability === 'available' ? 'Available' : 'On Duty'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{provider.rating}</span>
              <span className="text-slate-400">({provider.reviewCount} tasks)</span>
              <span className="text-slate-300 dark:text-slate-700 mx-1">•</span>
              <span className="text-slate-500">{provider.experienceYears} yrs exp</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{provider.location}</span>
            </div>
          </div>
        </div>

        {/* Verification badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {provider.policeVerificationDone && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-md border border-brand-200/50 dark:border-brand-800/40">
              <ShieldCheck className="w-3 h-3 text-brand-600" /> Police Verified
            </span>
          )}
          {provider.idVerified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
              <Award className="w-3 h-3 text-slate-500" /> ID Authenticated
            </span>
          )}
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Languages: {provider.languages.join(', ')}</span>
        </div>
      </div>

      {/* Services Supported Tags */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap gap-1">
          {provider.services.map((srv, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
            >
              {srv}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
