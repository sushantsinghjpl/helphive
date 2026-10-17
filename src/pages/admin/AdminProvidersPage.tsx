import React, { useState } from 'react';
import { initialProviders } from '../../data/mockData';
import { Provider } from '../../types';
import {
  ShieldCheck,
  Star,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Plus,
  Phone,
  Mail,
  MapPin,
  X
} from 'lucide-react';

export const AdminProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [search, setSearch] = useState('');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [inspectProvider, setInspectProvider] = useState<Provider | null>(null);

  const filtered = providers.filter(p => {
    if (selectedVerification !== 'all' && p.verificationStatus !== selectedVerification) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.phone.includes(q);
    }
    return true;
  });

  const handleUpdateStatus = (id: string, newStatus: Provider['verificationStatus']) => {
    setProviders(providers.map(p => p.id === id ? { ...p, verificationStatus: newStatus } : p));
    if (inspectProvider && inspectProvider.id === id) {
      setInspectProvider({ ...inspectProvider, verificationStatus: newStatus });
    }
  };

  const handleToggleAvailability = (id: string) => {
    setProviders(providers.map(p => {
      if (p.id === id) {
        const nextAvail = p.availability === 'available' ? 'offline' : 'available';
        return { ...p, availability: nextAvail };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Service Providers & Verification Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit background check documents, police records, and verify field companions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800">
            Total Staff: {providers.length}
          </span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search provider by name, city or phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
          />
        </div>

        <select
          value={selectedVerification}
          onChange={(e) => setSelectedVerification(e.target.value)}
          className="text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
        >
          <option value="all">All Verification States</option>
          <option value="verified">Verified (Active)</option>
          <option value="pending">Pending Document Clearance</option>
          <option value="rejected">Rejected</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-slate-400 font-semibold uppercase text-[11px]">
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-3">Location & Languages</th>
                <th className="py-3.5 px-3">Services Handled</th>
                <th className="py-3.5 px-3">Rating & Tasks</th>
                <th className="py-3.5 px-3">Availability</th>
                <th className="py-3.5 px-3">Verification State</th>
                <th className="py-3.5 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-2xl object-cover border border-slate-300 dark:border-slate-700" />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{p.name}</span>
                        <span className="text-[11px] text-slate-400">{p.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                    <div>{p.location}</div>
                    <div className="text-[11px] text-slate-400">{p.languages.join(', ')}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.services.map((s, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{p.rating}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{p.completedTasks} completed</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => handleToggleAvailability(p.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full transition ${
                        p.availability === 'available'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : p.availability === 'on_duty'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {p.availability}
                    </button>
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={p.verificationStatus}
                      onChange={(e) => handleUpdateStatus(p.id, e.target.value as any)}
                      className={`text-xs font-bold rounded-lg border-0 px-2 py-1 cursor-pointer ${
                        p.verificationStatus === 'verified'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : p.verificationStatus === 'pending'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                      }`}
                    >
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setInspectProvider(p)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspector Modal */}
      {inspectProvider && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Provider Audit: {inspectProvider.name}
              </h3>
              <button onClick={() => setInspectProvider(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-4">
                <img src={inspectProvider.photo} alt={inspectProvider.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">{inspectProvider.name}</h4>
                  <p className="text-slate-500">{inspectProvider.phone} • {inspectProvider.email}</p>
                  <p className="text-slate-400">{inspectProvider.location}</p>
                </div>
              </div>

              {/* Verified Badges info */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white block">Verification Checklist:</span>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>State Police Clearance Certificate (Verified)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aadhaar Biometric & Address Authentication (Verified)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Hospital Etiquette & Senior Care Training (Passed)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => handleUpdateStatus(inspectProvider.id, 'verified')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Mark as Verified
                </button>
                <button
                  onClick={() => handleUpdateStatus(inspectProvider.id, 'suspended')}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
                >
                  Suspend Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
