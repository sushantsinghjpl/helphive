import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { calculateBookingPrice } from '../../services/api/pricingEngine';
import { Service, DurationPlan, BookingCustomerDetails } from '../../types';
import { renderServiceIcon } from '../../components/cards/ServiceCard';
import {
  CalendarCheck,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Tag,
  Sparkles,
  Smartphone,
  Building,
  Wallet
} from 'lucide-react';

export const BookingFlowPage: React.FC = () => {
  const { services, loading: servicesLoading } = useServices();
  const { createBooking } = useBookings();
  const { customer } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Active step (1 to 6)
  // Step 1: Service
  // Step 2: Duration / Plan
  // Step 3: Schedule (Date & Time)
  // Step 4: Location & Contact Details
  // Step 5: Review & Payment (Mock UPI, Card, Net Banking, Wallet)
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('09:30 AM - 12:30 PM');
  
  // Customer & Location details
  const [customerDetails, setCustomerDetails] = useState<BookingCustomerDetails>({
    name: customer?.name || 'Amitabh Sen',
    phone: customer?.phone || '+91 98711 22334',
    email: customer?.email || 'amitabh.sen@gmail.com',
    address: 'Max Super Speciality Hospital, Press Enclave Marg, Saket',
    landmark: 'Near OPD Entry Gate 2',
    city: 'New Delhi',
    pincode: '110017',
    patientName: 'Kailash Nath Sen (Age 74)',
    emergencyContact: '+91 98711 22335',
    specialInstructions: 'Patient needs wheelchair accompaniment and token line standing.'
  });

  // Coupon code & Mock payment
  const [couponCode, setCouponCode] = useState<string>('WELCOME100');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('WELCOME100');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState<string>('customer@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Time Slots options
  const timeSlots = [
    '08:00 AM - 11:00 AM',
    '09:30 AM - 12:30 PM',
    '11:00 AM - 02:00 PM',
    '02:00 PM - 05:00 PM',
    '04:30 PM - 07:30 PM',
    '08:00 PM - 11:00 PM (Night Slot)'
  ];

  // Initialize service from URL query param
  useEffect(() => {
    if (services.length > 0) {
      const paramSlug = searchParams.get('service');
      const paramPlan = searchParams.get('plan');

      let targetService = services.find(s => s.slug === paramSlug) || services[0];
      setSelectedServiceId(targetService.id);

      if (paramPlan && targetService.plans.some(p => p.id === paramPlan)) {
        setSelectedPlanId(paramPlan);
      } else {
        const defaultPlan = targetService.plans.find(p => p.popular) || targetService.plans[0];
        if (defaultPlan) setSelectedPlanId(defaultPlan.id);
      }
    }
  }, [services, searchParams]);

  // Selected Service & Plan objects
  const activeService = useMemo(() => {
    return services.find(s => s.id === selectedServiceId) || services[0];
  }, [services, selectedServiceId]);

  const activePlan = useMemo(() => {
    if (!activeService) return null;
    return activeService.plans.find(p => p.id === selectedPlanId) || activeService.plans[0];
  }, [activeService, selectedPlanId]);

  // Dynamic Price Breakdown
  const pricing = useMemo(() => {
    if (!activePlan) {
      return { basePrice: 0, surgeFee: 0, platformFee: 49, tax: 0, discount: 0, total: 49 };
    }
    return calculateBookingPrice({
      plan: activePlan,
      dateStr: selectedDate,
      timeSlot: selectedTimeSlot,
      couponCode: appliedCoupon
    });
  }, [activePlan, selectedDate, selectedTimeSlot, appliedCoupon]);

  // Confirm and Submit Booking
  const handleConfirmBooking = async () => {
    if (!activeService || !activePlan) return;
    setIsSubmitting(true);

    try {
      const newBooking = await createBooking({
        serviceId: activeService.id,
        serviceName: activeService.name,
        serviceSlug: activeService.slug,
        serviceIcon: activeService.icon,
        planId: activePlan.id,
        planName: activePlan.name,
        hours: activePlan.hours,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        customer: customerDetails,
        status: 'confirmed',
        pricing,
        payment: {
          method: paymentMethod,
          status: 'paid',
          transactionId: `TXN-${Date.now().toString().slice(-8)}`,
          paidAt: new Date().toISOString()
        }
      });

      navigate(`/booking-confirmation/${newBooking.id}`);
    } catch (e) {
      console.error('Failed to create booking:', e);
      setIsSubmitting(false);
    }
  };

  if (servicesLoading || !activeService) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm">Preparing booking wizard...</p>
      </div>
    );
  }

  const stepsLabels = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Plan' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Payment' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Wizard Progress Indicator Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Step {step} of 5: {stepsLabels[step - 1].label}</span>
          <span className="text-brand-600 dark:text-brand-400">Estimated: ₹{pricing.total}</span>
        </div>

        {/* Progress Dots / Bar */}
        <div className="grid grid-cols-5 gap-2">
          {stepsLabels.map(s => {
            const isDone = s.num < step;
            const isCurrent = s.num === step;
            return (
              <div
                key={s.num}
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  isCurrent
                    ? 'bg-brand-600 ring-2 ring-brand-300 dark:ring-brand-950'
                    : isDone
                    ? 'bg-emerald-500'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
                title={`Jump to Step ${s.num}: ${s.label}`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Main 2-column layout: Form (left) + Sticky Live Price Summary (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Current Wizard Step */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            
            {/* ---------------------------------------------------- */}
            {/* STEP 1: SELECT SERVICE                               */}
            {/* ---------------------------------------------------- */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Step 1: Choose Assistance Service
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select the service category required for yourself or your loved ones.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {services.filter(s => s.status === 'active').map(srv => {
                    const isSelected = selectedServiceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => {
                          setSelectedServiceId(srv.id);
                          const defPlan = srv.plans.find(p => p.popular) || srv.plans[0];
                          if (defPlan) setSelectedPlanId(defPlan.id);
                        }}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20'
                            : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                            {renderServiceIcon(srv.icon, 'w-5 h-5')}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {srv.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {srv.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-3">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white block">
                            ₹{srv.basePrice}
                          </span>
                          <span className="text-[11px] text-slate-400">starting</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 2: SELECT DURATION PLAN                         */}
            {/* ---------------------------------------------------- */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Step 2: Select Duration / Plan
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    How long do you need assistance for? (Managed dynamically from Admin Portal).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.plans.map(plan => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition ${
                          isSelected
                            ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 ring-2 ring-brand-500/20'
                            : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {plan.name}
                          </span>
                          {plan.savingsPercent && (
                            <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                              Save {plan.savingsPercent}%
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1 my-2">
                          <span className="text-xl font-black text-slate-900 dark:text-white">
                            ₹{plan.price}
                          </span>
                          <span className="text-xs text-slate-400">/ {plan.hours}h</span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {plan.description || `${plan.hours} hours of dedicated assistant companionship.`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 3: SCHEDULE DATE & TIME                         */}
            {/* ---------------------------------------------------- */}
            {step === 3 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Step 3: Pick Date & Time Slot
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose when your assistant should report.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Service Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {timeSlots.map(slot => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-3 rounded-xl text-xs font-semibold text-left transition border ${
                            isSelected
                              ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{slot}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 4: LOCATION & CONTACT DETAILS                   */}
            {/* ---------------------------------------------------- */}
            {step === 4 && (
              <div className="space-y-4 animate-fade-in text-xs sm:text-sm">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Step 4: Location & Contact Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Provide the meeting point (hospital/residence) and patient contact info.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Hospital / Service Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                      placeholder="e.g. Max Super Speciality Hospital, Press Enclave Marg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Landmark / Gate / Department
                      </label>
                      <input
                        type="text"
                        value={customerDetails.landmark}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, landmark: e.target.value })}
                        placeholder="e.g. Near OPD Gate 2"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        City & Pincode
                      </label>
                      <input
                        type="text"
                        value={`${customerDetails.city} - ${customerDetails.pincode}`}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value.split('-')[1]?.trim() || '' })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Customer Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone (for OTP & Updates)
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Patient / Recipient Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={customerDetails.patientName || ''}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, patientName: e.target.value })}
                        placeholder="e.g. Kailash Nath Sen (Age 74)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={customerDetails.emergencyContact || ''}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, emergencyContact: e.target.value })}
                        placeholder="e.g. +91 98711 22335"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Special Requirements / Notes for Assistant
                    </label>
                    <textarea
                      rows={2}
                      value={customerDetails.specialInstructions || ''}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, specialInstructions: e.target.value })}
                      placeholder="Wheelchair assistance, report collection, specific OPD token or floor instructions..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 5: REVIEW & MOCK PAYMENT LAYER                  */}
            {/* ---------------------------------------------------- */}
            {step === 5 && (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Step 5: Review & Secure Mock Payment
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Demo-ready payment layer. No real money will be charged.
                  </p>
                </div>

                {/* Booking summary recap box */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plan:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{activePlan?.name} ({activePlan?.hours}h)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Slot:</span>
                    <span className="text-slate-800 dark:text-slate-200">{selectedDate} ({selectedTimeSlot})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Meeting Point:</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs">{customerDetails.address}</span>
                  </div>
                </div>

                {/* Payment Methods Tabs */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Select Payment Method (Demo Layer)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'upi'
                          ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-emerald-500" />
                      <span>UPI (GPay/PhonePe)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'card'
                          ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-brand-500" />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'netbanking'
                          ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Building className="w-5 h-5 text-amber-500" />
                      <span>Net Banking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === 'wallet'
                          ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Wallet className="w-5 h-5 text-purple-500" />
                      <span>Paytm / Wallets</span>
                    </button>
                  </div>
                </div>

                {/* UPI details input */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                    />
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 block">
                      Instant verification simulation enabled
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons (Back & Next) */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-semibold shadow-md transition"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-sm font-extrabold shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Demo Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Pay ₹{pricing.total} & Confirm Booking</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Sticky Live Pricing & Breakdown */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Price Breakdown
              </h3>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded">
                Live Engine
              </span>
            </div>

            {/* Selected Service Snippet */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                {renderServiceIcon(activeService.icon, 'w-5 h-5')}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {activeService.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {activePlan?.name} • {activePlan?.hours} Hour(s)
                </p>
              </div>
            </div>

            {/* Itemized math */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span>Base Plan Price:</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{pricing.basePrice}</span>
              </div>

              {pricing.surgeFee > 0 && (
                <div className="flex justify-between text-amber-600 dark:text-amber-400">
                  <span>Night / Peak Hour Surcharge:</span>
                  <span className="font-semibold">+₹{pricing.surgeFee}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Platform & Trust Verification Fee:</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{pricing.platformFee}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{pricing.tax}</span>
              </div>

              {pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Coupon ({appliedCoupon}):</span>
                  <span>-₹{pricing.discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Total Payable:</span>
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                  ₹{pricing.total}
                </span>
              </div>
            </div>

            {/* Promo Coupon Box */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Have a Promo Code?
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="WELCOME100"
                  className="w-full px-3 py-2 text-xs uppercase font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setAppliedCoupon(couponCode)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-white dark:bg-slate-700 text-xs font-semibold hover:bg-slate-700"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Try: <span className="font-bold text-brand-600">WELCOME100</span> or <span className="font-bold text-brand-600">HEALTHFIRST</span>
              </p>
            </div>

            {/* Trust badge */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
              <span>Full refund guarantee if cancelled 2+ hours in advance.</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
