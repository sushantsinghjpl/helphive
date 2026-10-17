import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Users, Shield, Target, Award, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          About HelpHive
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Compassionate Human Help When Distance or Busy Lives Get in the Way
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Millions of working professionals live in different cities or countries from their aging parents. When medical visits or daily challenges arise, HelpHive steps in as their verified, reliable proxy family.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Heart className="w-6 h-6 fill-brand-600 text-brand-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            To provide dependable, dignified, and empathetic human assistance for every Indian family, removing the anxiety from hospital visits and daily errands.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trust Above All</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We hold ourselves to the highest standard of verification. Every provider is treated with fair compensation while ensuring absolute customer safety.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Data-Driven Quality</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our platform continuously evaluates punctuality, ratings, customer feedback, and response times to maintain world-class assistance quality.
          </p>
        </div>
      </div>

      {/* Numbers */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div>
          <span className="block text-3xl sm:text-4xl font-extrabold text-brand-400">15,000+</span>
          <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Assistance Hours</span>
        </div>
        <div>
          <span className="block text-3xl sm:text-4xl font-extrabold text-white">100%</span>
          <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Police Verified</span>
        </div>
        <div>
          <span className="block text-3xl sm:text-4xl font-extrabold text-amber-400">4.92 ★</span>
          <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Average Rating</span>
        </div>
        <div>
          <span className="block text-3xl sm:text-4xl font-extrabold text-emerald-400">6 Cities</span>
          <span className="text-xs sm:text-sm text-slate-400 mt-1 block">Covered Across India</span>
        </div>
      </div>

    </div>
  );
};
