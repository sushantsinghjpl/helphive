import React from 'react';
import { Booking } from '../../types';
import { X, Printer, Download, CheckCircle, HeartHandshake } from 'lucide-react';

interface InvoiceModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ booking, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in text-slate-800 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">Tax Invoice</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">INV-{booking.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm" id="printable-invoice">
          
          {/* Company & Billing Top row */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">HelpHive Technologies Pvt. Ltd.</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Connaught Place, Central Delhi, 110001<br />
                GSTIN: 07AAACH1234F1Z8<br />
                care@helphive.in | 1800-419-4483
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-slate-400 text-xs block">Invoice Details</span>
              <span className="font-bold text-slate-900 dark:text-white block mt-0.5">Invoice #: INV-{booking.id}</span>
              <span className="text-slate-500 block">Date: {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <span className="inline-flex items-center gap-1 mt-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" /> Paid via {booking.payment.method.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Billed To Customer info */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Billed To (Customer):</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{booking.customer.name}</p>
                <p>{booking.customer.phone}</p>
                <p>{booking.customer.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Service Location:</p>
                <p>{booking.customer.address}, {booking.customer.city} - {booking.customer.pincode}</p>
                {booking.customer.patientName && (
                  <p className="text-brand-600 dark:text-brand-400 mt-1">Patient: {booking.customer.patientName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Service Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px] font-semibold">
                  <th className="py-2.5">Service Description</th>
                  <th className="py-2.5">Scheduled Date & Time</th>
                  <th className="py-2.5">Duration</th>
                  <th className="py-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">
                    {booking.serviceName}
                    <span className="block text-xs font-normal text-slate-500 dark:text-slate-400">{booking.planName}</span>
                    {booking.provider && (
                      <span className="block text-xs text-brand-600 dark:text-brand-400">Assigned: {booking.provider.name}</span>
                    )}
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">
                    {booking.date}<br />
                    <span className="text-xs text-slate-400">{booking.timeSlot}</span>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">
                    {booking.hours} Hour(s)
                  </td>
                  <td className="py-3 text-right font-medium text-slate-900 dark:text-white">
                    ₹{booking.pricing.basePrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Math Summary */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-end">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Base Plan Price:</span>
                <span>₹{booking.pricing.basePrice}</span>
              </div>
              {booking.pricing.surgeFee > 0 && (
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Night / Peak Surcharge:</span>
                  <span>₹{booking.pricing.surgeFee}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Platform & Trust Fee:</span>
                <span>₹{booking.pricing.platformFee}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST (18%):</span>
                <span>₹{booking.pricing.tax}</span>
              </div>
              {booking.pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount:</span>
                  <span>-₹{booking.pricing.discount}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-900 dark:text-white">
                <span>Total Amount Paid:</span>
                <span className="text-brand-600 dark:text-brand-400">₹{booking.pricing.total}</span>
              </div>
              {booking.payment.transactionId && (
                <p className="text-[10px] text-slate-400 text-right pt-1">
                  Txn ID: {booking.payment.transactionId}
                </p>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
            This is a computer-generated tax invoice. HelpHive is an intermediary platform connecting independent verified assistants with customers.
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white dark:bg-slate-700 text-xs font-semibold hover:bg-slate-700 transition"
          >
            Close Invoice
          </button>
        </div>

      </div>
    </div>
  );
};
