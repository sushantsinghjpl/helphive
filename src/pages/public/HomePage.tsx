import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ReviewCard } from '../../components/cards/ReviewCard';
import { initialReviews, initialFaqs } from '../../data/mockData';
import { getWhatsAppLink } from '../../services/whatsapp';
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Award,
  Zap,
  HeartPulse
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { services, loading } = useServices();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(350);
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  // Categories list
  const categories = ['All', 'Hospital', 'Care', 'Personal Assistance', 'Driver', 'Urgent Help'];

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      // Must be active
      if (service.status !== 'active') return false;

      // Category filter
      if (selectedCategory !== 'All' && service.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Max price filter
      if (service.basePrice > maxPriceFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesDesc = service.shortDescription.toLowerCase().includes(q);
        const matchesCat = service.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [services, selectedCategory, maxPriceFilter, searchQuery]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById('services-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        
        {/* Subtle decorative background gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-400/10 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Top Verified Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold text-slate-700 dark:text-slate-200 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>100% Police & Identity Verified Assistance</span>
            </div>

            {/* Main Headline & Subheadline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Trusted help, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
                when you need it.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Book verified, compassionate people for everyday assistance, hospital support, elderly care, personal errands, car drivers, and urgent non-medical help.
            </p>

            {/* Quick Service Search Bar */}
            <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl shadow-card dark:shadow-card-dark border border-slate-200 dark:border-slate-800 p-1.5 focus-within:ring-2 focus-within:ring-brand-500 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What help do you need today? (e.g., Hospital OPD, Elder Care, Driver)..."
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-transparent border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm shrink-0 transition"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-sm shadow-md shadow-brand-600/25 transition"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <a
                href="#services-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm transition"
              >
                <span>Explore Services</span>
              </a>

              <a
                href={getWhatsAppLink('Hi HelpHive, I need assistance booking a helper.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 font-bold text-sm transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Trust Indicators Stats Strip */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-200/60 dark:border-slate-800/80">
              <div className="text-center p-2">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">100%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Police & ID Verified</span>
              </div>
              <div className="text-center p-2">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">15,000+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Assistance Hours</span>
              </div>
              <div className="text-center p-2">
                <span className="block text-2xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">1,200+ Reviews</span>
              </div>
              <div className="text-center p-2">
                <span className="block text-2xl font-black text-slate-900 dark:text-white">30-45m</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Urgent Dispatch</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SERVICES SECTION (DATA-DRIVEN)                        */}
      {/* ======================================================== */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            On-Demand Marketplace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {t.servicesSection.heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
            {t.servicesSection.subheading}
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8 space-y-4">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Price Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 items-center">
            
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter services by keyword (e.g. OPD, pharmacy, senior, driver)..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Max Price: ₹{maxPriceFilter}/hr
              </span>
              <input
                type="range"
                min="150"
                max="350"
                step="10"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

          </div>

        </div>

        {/* Services Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <HeartPulse className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No services found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              No services match your active filters. Try adjusting your search query or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setMaxPriceFilter(350);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* ======================================================== */}
      {/* 3. HOW IT WORKS SECTION                                  */}
      {/* ======================================================== */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
              Simple 4-Step Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
              {t.howItWorks.heading}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
              {t.howItWorks.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                {t.howItWorks.step1Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                {t.howItWorks.step2Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                {t.howItWorks.step3Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative">
              <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 font-extrabold text-sm flex items-center justify-center mb-4">
                4
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                {t.howItWorks.step4Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.howItWorks.step4Desc}
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm shadow-md transition"
            >
              <span>Experience Simple Booking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. TRUST & SAFETY SPOTLIGHT                              */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-300 bg-brand-950/80 border border-brand-500/30 px-3 py-1 rounded-full inline-block">
              Safety & Verification Guarantee
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
              {t.trust.heading}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t.trust.subheading} We know welcoming someone into your parents' lives or hospital visits requires complete trust. Here is how we enforce safety at every stage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.trust.policeVerified}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.trust.policeVerifiedDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.trust.govtId}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.trust.govtIdDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.trust.training}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.trust.trainingDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.trust.tracking}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.trust.trackingDesc}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/safety"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-300 hover:text-white transition"
              >
                <span>Read our full Safety & Screening Protocols →</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
            <ShieldCheck className="w-96 h-96 text-white" />
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. VERIFIED CUSTOMER REVIEWS                             */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Real Customer Stories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            Trusted by Hundreds of Indian Families
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            See how HelpHive brings peace of mind during doctor consultations and daily errands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initialReviews.slice(0, 3).map(rev => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. ACCORDION FAQS                                        */}
      {/* ======================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {initialFaqs.slice(0, 6).map(faq => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Have more questions? Browse all FAQs →
          </Link>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. BOTTOM CTA CALLOUT                                    */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-600 dark:bg-brand-700 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Need assistance today? We are ready.
            </h2>
            <p className="text-brand-100 text-xs sm:text-base">
              Book online in under 2 minutes or chat directly with our regional assistance coordinator on WhatsApp.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                to="/booking"
                className="px-6 py-3.5 rounded-2xl bg-white text-brand-700 hover:bg-slate-100 font-bold text-sm shadow-md transition"
              >
                Book a Verified Assistant
              </Link>

              <a
                href={getWhatsAppLink('Hi HelpHive, I need to urgently book a helper.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm border border-brand-400/30 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
