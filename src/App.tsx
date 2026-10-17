import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ServiceProvider } from './context/ServiceContext';
import { BookingProvider } from './context/BookingContext';
import { initStorage } from './services/api/storage';

// Common Components
import { DemoBanner } from './components/common/DemoBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppFloating } from './components/common/WhatsAppFloating';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ServiceDetailPage } from './pages/public/ServiceDetailPage';
import { PricingPage } from './pages/public/PricingPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { SafetyPage } from './pages/public/SafetyPage';
import { AboutPage } from './pages/public/AboutPage';
import { FaqPage } from './pages/public/FaqPage';
import { ContactPage } from './pages/public/ContactPage';
import { LegalPage } from './pages/public/LegalPage';
import { LoginPage } from './pages/public/LoginPage';

// Booking & Tracking Pages
import { BookingFlowPage } from './pages/booking/BookingFlowPage';
import { BookingConfirmationPage } from './pages/booking/BookingConfirmationPage';
import { BookingTrackingPage } from './pages/booking/BookingTrackingPage';

// Customer Dashboard
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';

// Admin Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminProvidersPage } from './pages/admin/AdminProvidersPage';
import { AdminPricingPage } from './pages/admin/AdminPricingPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminFaqsPage } from './pages/admin/AdminFaqsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <DemoBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    initStorage();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ServiceProvider>
            <BookingProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                  <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
                  <Route path="/services/:slug" element={<PublicLayout><ServiceDetailPage /></PublicLayout>} />
                  <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
                  <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
                  <Route path="/safety" element={<PublicLayout><SafetyPage /></PublicLayout>} />
                  <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
                  <Route path="/faq" element={<PublicLayout><FaqPage /></PublicLayout>} />
                  <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                  <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
                  <Route path="/signup" element={<PublicLayout><LoginPage /></PublicLayout>} />

                  {/* Legal Pages */}
                  <Route path="/terms" element={<PublicLayout><LegalPage initialTab="terms" /></PublicLayout>} />
                  <Route path="/privacy" element={<PublicLayout><LegalPage initialTab="privacy" /></PublicLayout>} />
                  <Route path="/cancellation-policy" element={<PublicLayout><LegalPage initialTab="cancellation" /></PublicLayout>} />
                  <Route path="/refund-policy" element={<PublicLayout><LegalPage initialTab="refund" /></PublicLayout>} />

                  {/* Booking Flow & Live Tracking */}
                  <Route path="/booking" element={<PublicLayout><BookingFlowPage /></PublicLayout>} />
                  <Route path="/booking-confirmation/:id" element={<PublicLayout><BookingConfirmationPage /></PublicLayout>} />
                  <Route path="/track/:id" element={<PublicLayout><BookingTrackingPage /></PublicLayout>} />

                  {/* Customer Dashboard */}
                  <Route path="/dashboard" element={<PublicLayout><CustomerDashboardPage /></PublicLayout>} />

                  {/* Admin Portal Layout & Sub-routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="services" element={<AdminServicesPage />} />
                    <Route path="bookings" element={<AdminBookingsPage />} />
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="providers" element={<AdminProvidersPage />} />
                    <Route path="pricing" element={<AdminPricingPage />} />
                    <Route path="reviews" element={<AdminReviewsPage />} />
                    <Route path="faqs" element={<AdminFaqsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                    {/* Fallback admin redirects */}
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                  </Route>

                  {/* 404 Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </BookingProvider>
          </ServiceProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
