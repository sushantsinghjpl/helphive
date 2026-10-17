import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  Award,
  Users,
  Lock,
  PhoneCall,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const SafetyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          Zero-Compromise Trust
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Trust & Safety Standards
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          We treat your family like our own. Our multi-stage vetting process ensures that only background-cleared, empathetic professionals represent HelpHive.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Police Background Check
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every candidate must clear official police verification and judicial criminal record searches across national databases before being onboarded.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Government ID & Address
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Permanent physical residence address checks combined with Aadhaar biometrics and PAN verification authenticate each helper's true identity.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            3. In-Person Empathy Training
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Hospital navigation, patient wheelchair safety, respectful senior communication, and emergency protocol procedures are taught in-person.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            4. Live GPS & Photo Checkpoints
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Live timeline updates, OTP handshakes, and photo receipts ensure families always know who is with their loved one and where they are.
          </p>
        </div>

      </div>

      {/* Safety Guidelines for Customers and Providers */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Our Operational Safety Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
          
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>For Customers & Families</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• Always verify the assistant's Photo ID and badge upon their arrival.</li>
              <li>• Share specific patient requirements (wheelchair, medicine schedules) in advance.</li>
              <li>• Keep digital receipts and payments strictly within the HelpHive platform for escrow protection.</li>
              <li>• Contact our 24/7 coordinator line in case of any change of schedule or clinic delay.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Scope & Medical Limitations</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• HelpHive provides non-clinical companionship and logistical navigation.</li>
              <li>• Assistants do not perform clinical operations, invasive injections, or emergency surgeries.</li>
              <li>• In life-threatening medical emergencies, immediately dial 112 / 108 for ambulance services.</li>
              <li>• Assistants will never ask for bank OTPs, PINs, or confidential financial credentials.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
