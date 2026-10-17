import React, { useState } from 'react';
import { getAppSettings, getWhatsAppLink } from '../../services/whatsapp';
import { Phone, Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const settings = getAppSettings();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: settings.cityAvailability[0],
    service: 'Hospital Assistance',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          24/7 Assistance Desk
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          We're Here When You Need Us
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Have an upcoming hospital visit, parent requiring companion care, or questions? Speak with our regional coordination specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info & Operating Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Contact Channels
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Toll-Free Phone Support</span>
                  <a href={`tel:${settings.supportPhone}`} className="font-bold text-slate-900 dark:text-white text-base hover:text-brand-600">
                    {settings.supportPhone}
                  </a>
                  <p className="text-[11px] text-slate-500">Available 24 hours a day, 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Instant WhatsApp Chat</span>
                  <a
                    href={getWhatsAppLink('Hi HelpHive, I would like to talk to a support coordinator.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 hover:underline block"
                  >
                    Chat with Coordinator Now →
                  </a>
                  <p className="text-[11px] text-slate-500">{settings.whatsappNumber} (Instant reply)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email Assistance</span>
                  <a href={`mailto:${settings.supportEmail}`} className="font-bold text-slate-900 dark:text-white hover:text-brand-600">
                    {settings.supportEmail}
                  </a>
                  <p className="text-[11px] text-slate-500">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Service Hours</span>
                  <p className="font-bold text-slate-900 dark:text-white">Field Operations: 06:00 AM - 11:00 PM</p>
                  <p className="text-[11px] text-slate-500">Urgent Non-Medical Help: 24/7 on-demand</p>
                </div>
              </div>
            </div>

            {/* Service Area Cities */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Active Metro Service Areas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {settings.cityAvailability.map(city => (
                  <span
                    key={city}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form & Placeholder Map */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill in your details and our team will get back to you with custom coordinator assistance.
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our regional coordinator will contact you at {formData.phone} shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      {settings.cityAvailability.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option>Hospital Assistance</option>
                      <option>Elderly Care</option>
                      <option>Personal Assistant</option>
                      <option>Driver for Own Car</option>
                      <option>Urgent Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Message or Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the hospital visit, date, patient details, or any questions you have..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Placeholder Map & Metro Hubs */}
          <div className="bg-slate-100 dark:bg-slate-800/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-brand-600" />
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Hub Locations Across India
              </h4>
            </div>
            <div className="h-44 rounded-2xl bg-slate-200 dark:bg-slate-750 flex items-center justify-center text-slate-400 relative overflow-hidden border border-slate-300 dark:border-slate-700">
              <div className="text-center p-4">
                <span className="font-bold text-slate-700 dark:text-slate-200 block text-sm">
                  Interactive Service Map
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  Active Dispatch Hubs in Delhi NCR, Bengaluru, Mumbai, Hyderabad, Chennai, and Pune
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
