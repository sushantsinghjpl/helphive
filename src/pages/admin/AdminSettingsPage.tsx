import React, { useState } from 'react';
import { getAppSettings } from '../../services/whatsapp';
import { setStoredData, resetStorageToDefaults, STORAGE_KEYS } from '../../services/api/storage';
import { Settings, Save, RotateCcw, CheckCircle2, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState(getAppSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredData(STORAGE_KEYS.SETTINGS, settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Reset entire prototype database (services, bookings, reviews, FAQs) back to fresh demo state?')) {
      resetStorageToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            System & Contact Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure contact coordinates, WhatsApp links, and demo mode environment.
          </p>
        </div>

        {saved && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 text-xs sm:text-sm">
        
        <div>
          <label className="block font-semibold mb-1">WhatsApp Customer Care Number *</label>
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-medium"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Configures all "Book on WhatsApp" and chat buttons across the entire website.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Toll-Free Support Phone *</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-brand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Support Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Active Metro Service Cities (comma-separated)</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <textarea
              rows={2}
              value={settings.cityAvailability.join(', ')}
              onChange={(e) => setSettings({ ...settings, cityAvailability: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            ></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>

      </form>

      {/* Demo Reset Card */}
      <div className="bg-rose-50 dark:bg-rose-950/30 rounded-3xl p-6 border border-rose-200 dark:border-rose-900/50 space-y-3">
        <h3 className="font-bold text-sm text-rose-800 dark:text-rose-300">
          Reset Demo Prototype Database
        </h3>
        <p className="text-xs text-rose-700 dark:text-rose-400">
          If you created test services, changed prices, or modified bookings and wish to restore the pristine starter dataset, click below.
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Data to Initial State</span>
        </button>
      </div>

    </div>
  );
};
