import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  UserCheck,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  FileCheck,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { getWhatsAppLink } from '../../services/whatsapp';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          The HelpHive Experience
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          How Assistance Booking Works
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          From hospital consultations to senior companionship, here is how we ensure seamless coordination from start to finish.
        </p>
      </div>

      {/* Step by Step Journey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 flex items-center justify-center font-black text-xl">
            01
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Choose Service & Duration Plan
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Select what you need: Hospital OPD assistance, senior care, errands, personal car chauffeur, or rapid dispatch. Pick an hourly or bundled half-day / full-day plan that matches your schedule.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 flex items-center justify-center font-black text-xl">
            02
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Set Date, Time & Meeting Spot
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Specify whether meeting at hospital entrance Gate 2, OPD registration lobby, or home address. Add patient mobility details or wheelchair requests in our special instruction notes.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 flex items-center justify-center font-black text-xl">
            03
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Verified Assistant Allocation & OTP Check-in
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            We assign a 100% police and ID-verified assistant who arrives in uniform. On arrival, they authenticate with an OTP verification check to ensure maximum security.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 flex items-center justify-center font-black text-xl">
            04
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Live Timeline & Real-Time WhatsApp Updates
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Receive live photo checkpoints from queues, doctor consultation prescription summaries, report collection receipts, and a complete hand-over update.
          </p>
        </div>

      </div>

      {/* CTA Box */}
      <div className="bg-brand-600 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Book Trusted Assistance?</h2>
        <p className="text-brand-100 text-xs sm:text-sm max-w-xl mx-auto">
          Experience total peace of mind for you and your family. Book online in 2 minutes.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/booking"
            className="px-6 py-3 rounded-2xl bg-white text-brand-700 font-bold text-sm shadow-md hover:bg-slate-100 transition"
          >
            Book a Service Now
          </Link>
          <a
            href={getWhatsAppLink('Hi HelpHive, I would like to understand how booking works.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-brand-800 text-white font-bold text-sm border border-brand-400/40 hover:bg-brand-900 transition flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
