import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, RefreshCw, XCircle } from 'lucide-react';

export const LegalPage: React.FC<{ initialTab?: 'terms' | 'privacy' | 'cancellation' | 'refund' }> = ({ initialTab = 'terms' }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'cancellation' | 'refund'>(initialTab);

  useEffect(() => {
    if (location.pathname.includes('privacy')) setActiveTab('privacy');
    else if (location.pathname.includes('cancellation')) setActiveTab('cancellation');
    else if (location.pathname.includes('refund')) setActiveTab('refund');
    else if (location.pathname.includes('terms')) setActiveTab('terms');
  }, [location.pathname]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          Policies & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Legal & Operational Policies
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last revised: May 2025 • Governing the HelpHive platform and services
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'terms'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Terms of Service
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'privacy'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setActiveTab('cancellation')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'cancellation'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Cancellation Policy
        </button>
        <button
          onClick={() => setActiveTab('refund')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
            activeTab === 'refund'
              ? 'border-brand-600 text-brand-600 dark:text-brand-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Refund Policy
        </button>
      </div>

      {/* Content Body */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-6">
        
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Terms of Service</h2>
            <p>
              Welcome to HelpHive. By accessing our platform, booking assistance services, or interacting with our coordinators, you agree to comply with and be bound by the following Terms and Conditions.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white pt-2">1.1 Nature of Platform</h3>
            <p>
              HelpHive acts as an intermediary technology platform connecting independent, verified service providers with customers requiring non-clinical assistance (hospital navigation, senior companionship, errands, personal car driving). HelpHive is NOT a hospital, nursing agency, or clinical healthcare provider.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white pt-2">1.2 User Responsibilities</h3>
            <p>
              Customers must disclose all relevant patient mobility limitations and hospital protocols in advance. Customers must not request providers to perform medical surgeries, administer prescription injections, or carry cash sums exceeding platform limits.
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Privacy & Data Protection</h2>
            <p>
              HelpHive is deeply committed to protecting the privacy and sensitive health data of our customers, patients, and service assistants under applicable Indian IT and data privacy regulations.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white pt-2">2.1 Information Collected</h3>
            <p>
              We collect customer name, phone number, email address, service location, and patient details explicitly provided for booking coordination. We do not store credit card CVVs or bank PINs.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white pt-2">2.2 Use of Information</h3>
            <p>
              Data is used strictly to dispatch verified assistants, provide WhatsApp and SMS status updates, process refunds, and fulfill tax invoicing obligations.
            </p>
          </div>
        )}

        {activeTab === 'cancellation' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Cancellation Policy</h2>
            <p>
              We understand that doctor clinic schedules and emergency situations can change unexpectedly. Our cancellation policy is designed to be fair to both customers and field assistants.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <p><strong>• Cancellations &gt; 2 Hours Before:</strong> Free 100% cancellation with full refund.</p>
              <p><strong>• Cancellations &lt; 2 Hours Before:</strong> A nominal ₹99 assistant travel allowance is deducted, and the balance is immediately refunded.</p>
              <p><strong>• Cancellation After Provider Arrival:</strong> Billed at the 1-hour base rate; remainder refunded.</p>
            </div>
          </div>
        )}

        {activeTab === 'refund' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Refund Policy</h2>
            <p>
              Approved refunds are credited to the original payment method (UPI, Bank Account, or Card) within 2 to 4 working days according to standard banking clearing cycles.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white pt-2">4.1 Service Quality Guarantee</h3>
            <p>
              If an assigned assistant fails to report on time or violates platform conduct, please notify our coordinator within 24 hours for a full refund or complimentary reschedule.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
