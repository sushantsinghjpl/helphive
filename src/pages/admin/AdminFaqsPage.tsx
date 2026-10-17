import React, { useState } from 'react';
import { initialFaqs } from '../../data/mockData';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../../services/api/storage';
import { GlobalFAQ } from '../../types';
import { Plus, Edit, Trash2, HelpCircle, X, CheckCircle2 } from 'lucide-react';

export const AdminFaqsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<GlobalFAQ[]>(() => {
    return getStoredData<GlobalFAQ[]>(STORAGE_KEYS.FAQS, initialFaqs);
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<GlobalFAQ | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState<GlobalFAQ['category']>('general');

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setCategory('general');
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: GlobalFAQ) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      const updated = faqs.map(f => f.id === editingFaq.id ? { ...f, question, answer, category } : f);
      setFaqs(updated);
      setStoredData(STORAGE_KEYS.FAQS, updated);
    } else {
      const created: GlobalFAQ = {
        id: `faq-${Date.now()}`,
        question,
        answer,
        category
      };
      const updated = [created, ...faqs];
      setFaqs(updated);
      setStoredData(STORAGE_KEYS.FAQS, updated);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this FAQ entry?')) {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      setStoredData(STORAGE_KEYS.FAQS, updated);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            FAQ Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Add and update knowledge base articles for hospital navigation, elderly care, and payments.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map(faq => (
          <div
            key={faq.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 inline-block">
                {faq.category}
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white pt-1">
                {faq.question}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-1.5 text-slate-400 hover:text-amber-500 transition"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="general">General</option>
                  <option value="hospital">Hospital Assistance</option>
                  <option value="safety">Safety & Verification</option>
                  <option value="booking">Booking & Scheduling</option>
                  <option value="payment">Pricing & Payment</option>
                  <option value="cancellation">Cancellation & Refund</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. Can the assistant push my parent's wheelchair?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Comprehensive, reassuring answer..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition"
                >
                  {editingFaq ? 'Save FAQ' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
