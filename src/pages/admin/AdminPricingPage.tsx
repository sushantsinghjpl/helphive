import React, { useState } from 'react';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../../services/api/storage';
import { defaultPricingConfig } from '../../data/mockData';
import { PricingConfig } from '../../types';
import { DollarSign, Percent, Tag, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const AdminPricingPage: React.FC = () => {
  const [config, setConfig] = useState<PricingConfig>(() => {
    return getStoredData<PricingConfig>(STORAGE_KEYS.PRICING, defaultPricingConfig);
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // New coupon form
  const [newCode, setNewCode] = useState('');
  const [newDiscountPct, setNewDiscountPct] = useState(15);
  const [newMaxDiscount, setNewMaxDiscount] = useState(100);
  const [newMinAmount, setNewMinAmount] = useState(399);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredData(STORAGE_KEYS.PRICING, config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addCoupon = () => {
    if (newCode.trim()) {
      const updatedCoupons = [
        ...config.coupons,
        {
          code: newCode.trim().toUpperCase(),
          discountPercentage: Number(newDiscountPct),
          maxDiscount: Number(newMaxDiscount),
          minBookingAmount: Number(newMinAmount)
        }
      ];
      const updated = { ...config, coupons: updatedCoupons };
      setConfig(updated);
      setStoredData(STORAGE_KEYS.PRICING, updated);
      setNewCode('');
    }
  };

  const removeCoupon = (code: string) => {
    const updatedCoupons = config.coupons.filter(c => c.code !== code);
    const updated = { ...config, coupons: updatedCoupons };
    setConfig(updated);
    setStoredData(STORAGE_KEYS.PRICING, updated);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Pricing Engine Rules & Surcharges
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure global multipliers, taxes, night charges, platform fees, and coupon codes.
          </p>
        </div>

        {savedSuccess && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> Pricing Rules Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-6">
        
        {/* Surcharge rules */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Global Fees & Surcharge Percentages
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold mb-1">
                Night Shift Surcharge (8 PM to 6 AM) %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={config.nightChargePercentage}
                  onChange={(e) => setConfig({ ...config, nightChargePercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Directly compensates assistant for late night travel.</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Weekend Surge (Saturday & Sunday) %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={config.weekendSurgePercentage}
                  onChange={(e) => setConfig({ ...config, weekendSurgePercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Applied during peak weekend traffic hours.</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Platform & Trust Verification Fee (₹)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  value={config.platformFee}
                  onChange={(e) => setConfig({ ...config, platformFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Covers police background checks and live coordinator support.</p>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Goods & Services Tax (GST) %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={28}
                  value={config.gstPercentage}
                  onChange={(e) => setConfig({ ...config, gstPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Statutory GST on assistance services (default 18%).</p>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Pricing Multipliers
          </button>
        </div>

      </form>

      {/* Promo Coupons Management */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Active Discount Coupons
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {config.coupons.map((coupon) => (
            <div key={coupon.code} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs relative">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-brand-600 dark:text-brand-400">{coupon.code}</span>
                <button
                  onClick={() => removeCoupon(coupon.code)}
                  className="text-slate-400 hover:text-rose-500 p-0.5"
                  title="Remove Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                {coupon.discountPercentage}% Off (up to ₹{coupon.maxDiscount})
              </p>
              <span className="text-[11px] text-slate-400 block">Min order: ₹{coupon.minBookingAmount}</span>
            </div>
          ))}
        </div>

        {/* Add Coupon Form */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <span className="font-bold text-xs text-slate-700 dark:text-slate-300 block">Create New Coupon</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            <input
              type="text"
              placeholder="CODE (e.g. SAVE20)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold uppercase"
            />
            <input
              type="number"
              placeholder="Discount %"
              value={newDiscountPct}
              onChange={(e) => setNewDiscountPct(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
            <input
              type="number"
              placeholder="Max Disc (₹)"
              value={newMaxDiscount}
              onChange={(e) => setNewMaxDiscount(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
            <input
              type="number"
              placeholder="Min Order (₹)"
              value={newMinAmount}
              onChange={(e) => setNewMinAmount(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
            <button
              type="button"
              onClick={addCoupon}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 transition col-span-2 sm:col-span-1"
            >
              Add Coupon
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
