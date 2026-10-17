import React, { useState, useEffect } from 'react';
import { Service, DurationPlan, ServiceCategory } from '../../types';
import { X, Plus, Trash2, CheckCircle, AlertCircle, Layers } from 'lucide-react';

interface AdminServiceModalProps {
  service?: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: any) => Promise<void>;
}

export const AdminServiceModal: React.FC<AdminServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen) return null;

  const isEditing = !!service;

  // Form states
  const [name, setName] = useState(service?.name || '');
  const [slug, setSlug] = useState(service?.slug || '');
  const [category, setCategory] = useState<ServiceCategory>(service?.category || 'Hospital');
  const [shortDesc, setShortDesc] = useState(service?.shortDescription || '');
  const [desc, setDesc] = useState(service?.description || '');
  const [icon, setIcon] = useState(service?.icon || 'HeartPulse');
  const [image, setImage] = useState(service?.image || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80');
  const [basePrice, setBasePrice] = useState<number>(service?.basePrice || 219);
  const [pricingUnit, setPricingUnit] = useState(service?.pricingUnit || 'per hour');
  const [status, setStatus] = useState<'active' | 'inactive' | 'draft'>(service?.status || 'active');
  const [badge, setBadge] = useState(service?.badge || '');

  // Dynamic Features list
  const [features, setFeatures] = useState<string[]>(service?.features || [
    'Dedicated assistant accompaniment',
    'Report collection and verification'
  ]);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Dynamic Exclusions list
  const [exclusions, setExclusions] = useState<string[]>(service?.exclusions || [
    'Clinical procedures or medication prescription'
  ]);
  const [newExclusionText, setNewExclusionText] = useState('');

  // Dynamic Plans list
  const [plans, setPlans] = useState<DurationPlan[]>(service?.plans || [
    { id: 'plan-1', name: 'Hourly Plan', hours: 1, price: 219 },
    { id: 'plan-3', name: '3 Hours Assistance', hours: 3, price: 499, popular: true },
    { id: 'plan-6', name: '6 Hours Assistance', hours: 6, price: 849 }
  ]);

  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanHours, setNewPlanHours] = useState(4);
  const [newPlanPrice, setNewPlanPrice] = useState(699);

  // Auto-generate slug from name if new
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  // Feature helpers
  const addFeature = () => {
    if (newFeatureText.trim()) {
      setFeatures([...features, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };
  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // Exclusion helpers
  const addExclusion = () => {
    if (newExclusionText.trim()) {
      setExclusions([...exclusions, newExclusionText.trim()]);
      setNewExclusionText('');
    }
  };
  const removeExclusion = (idx: number) => {
    setExclusions(exclusions.filter((_, i) => i !== idx));
  };

  // Plan helpers
  const addPlan = () => {
    if (newPlanName.trim()) {
      const plan: DurationPlan = {
        id: `plan-${Date.now()}`,
        name: newPlanName.trim(),
        hours: Number(newPlanHours),
        price: Number(newPlanPrice)
      };
      setPlans([...plans, plan]);
      setNewPlanName('');
    }
  };
  const removePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      name,
      slug,
      category,
      shortDescription: shortDesc,
      description: desc,
      icon,
      image,
      basePrice: Number(basePrice),
      pricingUnit,
      status,
      badge: badge.trim() || undefined,
      available: status === 'active',
      popular: service?.popular || false,
      features,
      exclusions,
      plans,
      faqs: service?.faqs || []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in text-slate-800 dark:text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {isEditing ? `Edit Service: ${service.name}` : 'Create New Assistance Service'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* General service info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Service Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Hospital Assistance"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="hospital-assistance"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="Hospital">Hospital</option>
                <option value="Care">Care</option>
                <option value="Personal Assistance">Personal Assistance</option>
                <option value="Driver">Driver</option>
                <option value="Urgent Help">Urgent Help</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Starting Price (₹) *</label>
              <input
                type="number"
                required
                min={0}
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="active">Active (Publicly Visible)</option>
                <option value="inactive">Inactive (Disabled)</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Short Description (Cards view) *</label>
            <input
              type="text"
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Brief summary for cards..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Full Detailed Description *</label>
            <textarea
              rows={3}
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Detailed description shown on service detail page..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Icon Name (Lucide)</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option value="HeartPulse">HeartPulse (Hospital)</option>
                <option value="UserCheck">UserCheck (Elderly Care)</option>
                <option value="ShoppingBag">ShoppingBag (Errands)</option>
                <option value="Car">Car (Driver)</option>
                <option value="Zap">Zap (Urgent Assistance)</option>
                <option value="Shield">Shield</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Promotional Badge (Optional)</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Most Booked, Family Favorite"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* DYNAMIC DURATION PLANS EDITOR */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-slate-900 dark:text-white block">
              Dynamic Duration Plans (Hourly, 3h, 6h, etc.)
            </span>

            <div className="space-y-2">
              {plans.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{p.name}</span>
                    <span className="text-slate-400">({p.hours} hours)</span>
                    <span className="font-bold text-brand-600">₹{p.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlan(p.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new plan row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <input
                type="text"
                placeholder="Plan Name (e.g. 9 Hours Assistance)"
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs flex-1"
              />
              <input
                type="number"
                placeholder="Hours"
                value={newPlanHours}
                onChange={(e) => setNewPlanHours(Number(e.target.value))}
                className="w-16 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <input
                type="number"
                placeholder="Price (₹)"
                value={newPlanPrice}
                onChange={(e) => setNewPlanPrice(Number(e.target.value))}
                className="w-24 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
              />
              <button
                type="button"
                onClick={addPlan}
                className="px-3 py-1.5 rounded-lg bg-brand-600 text-white font-semibold text-xs hover:bg-brand-500 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Plan
              </button>
            </div>
          </div>

          {/* DYNAMIC FEATURES LIST */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-slate-900 dark:text-white block">
              What's Included (Features)
            </span>

            <div className="space-y-1.5">
              {features.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <span>{f}</span>
                  <button type="button" onClick={() => removeFeature(i)} className="text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new feature bullet..."
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs flex-1"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* DYNAMIC EXCLUSIONS LIST */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="font-bold text-slate-900 dark:text-white block">
              What's Not Included (Exclusions)
            </span>

            <div className="space-y-1.5">
              {exclusions.map((e, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                  <span>{e}</span>
                  <button type="button" onClick={() => removeExclusion(i)} className="text-slate-400 hover:text-rose-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add new exclusion..."
                value={newExclusionText}
                onChange={(e) => setNewExclusionText(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs flex-1"
              />
              <button
                type="button"
                onClick={addExclusion}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
            >
              {isEditing ? 'Save Changes' : 'Create Service'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
