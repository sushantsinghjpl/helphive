import React, { useState } from 'react';
import { useServices } from '../../context/ServiceContext';
import { Service } from '../../types';
import { AdminServiceModal } from './AdminServiceModal';
import { renderServiceIcon } from '../../components/cards/ServiceCard';
import {
  Plus,
  Edit,
  Copy,
  Trash2,
  Power,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminServicesPage: React.FC = () => {
  const {
    allAdminServices,
    loading,
    createService,
    updateService,
    toggleStatus,
    deleteService,
    duplicateService
  } = useServices();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const filtered = allAdminServices.filter(s => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
  });

  const handleEdit = (srv: Service) => {
    setEditingService(srv);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleSave = async (serviceData: any) => {
    if (editingService) {
      await updateService(editingService.id, serviceData);
    } else {
      await createService(serviceData);
    }
  };

  const handleToggle = async (id: string) => {
    await toggleStatus(id);
  };

  const handleDuplicate = async (id: string) => {
    await duplicateService(id);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteService(id);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Create, edit pricing plans, enable/disable services. Changes immediately sync to the public marketplace.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service name or category..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
          />
        </div>

        <span className="text-xs font-semibold text-slate-400">
          Showing {filtered.length} of {allAdminServices.length} services
        </span>
      </div>

      {/* Services Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 text-slate-400 font-semibold uppercase text-[11px]">
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Base Price</th>
                <th className="py-3.5 px-3">Plans Available</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3">Created</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(srv => {
                const isActive = srv.status === 'active';
                return (
                  <tr key={srv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    
                    {/* Service Name & Icon */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                          {renderServiceIcon(srv.icon, 'w-4 h-4')}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {srv.name}
                            </span>
                            {srv.popular && (
                              <span className="text-[9px] font-bold uppercase bg-amber-500/20 text-amber-500 px-1.5 py-0.2 rounded">
                                Pop
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono block">/{srv.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                        {srv.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                      ₹{srv.basePrice} <span className="text-xs text-slate-400 font-normal">/hr</span>
                    </td>

                    {/* Plans count */}
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 text-xs">
                      {srv.plans ? `${srv.plans.length} configured` : '1'}
                    </td>

                    {/* Status Pill & Toggle */}
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => handleToggle(srv.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                        <span className="capitalize">{srv.status}</span>
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-3 text-xs text-slate-400">
                      {srv.createdDate || '2025-01-15'}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/services/${srv.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Preview Public Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleEdit(srv)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDuplicate(srv.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Duplicate Service"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(srv.id, srv.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit Service */}
      <AdminServiceModal
        service={editingService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

    </div>
  );
};
