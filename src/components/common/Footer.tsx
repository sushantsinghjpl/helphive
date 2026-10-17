import React from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink, getAppSettings } from '../../services/whatsapp';
import {
  HeartHandshake,
  ShieldCheck,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const settings = getAppSettings();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Help<span className="text-brand-400">Hive</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India’s trusted everyday assistance marketplace. Book background-verified companions for hospital visits, elderly care, personal errands, car drivers, and urgent non-medical needs.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-brand-300">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>100% Police & ID Verified Helpers</span>
              </div>
            </div>
          </div>

          {/* Quick Services Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Assistance Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/hospital-assistance" className="hover:text-brand-400 transition">
                  Hospital Assistance
                </Link>
              </li>
              <li>
                <Link to="/services/elderly-care" className="hover:text-brand-400 transition">
                  Elderly Care & Companion
                </Link>
              </li>
              <li>
                <Link to="/services/personal-assistant" className="hover:text-brand-400 transition">
                  Personal Assistant & Errands
                </Link>
              </li>
              <li>
                <Link to="/services/driver-assistance" className="hover:text-brand-400 transition">
                  Driver for Your Own Car
                </Link>
              </li>
              <li>
                <Link to="/services/urgent-assistance" className="hover:text-brand-400 transition">
                  Urgent Non-Medical Help
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-400 font-medium hover:underline inline-block pt-1">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Company & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/how-it-works" className="hover:text-brand-400 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-brand-400 transition">
                  Safety & Verification
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-400 transition">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-400 transition">
                  About HelpHive
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Help & Support
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">{settings.supportPhone}</span>
                  <span className="text-[11px] text-slate-500">Toll-free customer care</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={getWhatsAppLink('Hi HelpHive, I need help with assistance booking.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    WhatsApp Chat Support
                  </a>
                  <span className="block text-[11px] text-slate-500">{settings.whatsappNumber}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">{settings.supportEmail}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300">Support: 24/7 Everyday</span>
                  <span className="block text-[11px] text-slate-500">Field hours: 06:00 AM - 11:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} HelpHive Technologies Pvt. Ltd. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>for Indian families.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <Link to="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link to="/cancellation-policy" className="hover:text-slate-300 transition">Cancellation Policy</Link>
            <Link to="/refund-policy" className="hover:text-slate-300 transition">Refund Policy</Link>
            <Link to="/admin" className="text-amber-400 hover:text-amber-300 transition font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
