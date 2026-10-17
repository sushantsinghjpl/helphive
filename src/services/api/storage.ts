import {
  initialServices,
  initialProviders,
  initialCustomers,
  initialBookings,
  initialReviews,
  initialFaqs,
  defaultPricingConfig
} from '../../data/mockData';
import {
  Service,
  Provider,
  Customer,
  Booking,
  Review,
  GlobalFAQ,
  PricingConfig
} from '../../types';

const STORAGE_KEYS = {
  SERVICES: 'helphive_services_v1',
  PROVIDERS: 'helphive_providers_v1',
  CUSTOMERS: 'helphive_customers_v1',
  BOOKINGS: 'helphive_bookings_v1',
  REVIEWS: 'helphive_reviews_v1',
  FAQS: 'helphive_faqs_v1',
  PRICING: 'helphive_pricing_config_v1',
  SETTINGS: 'helphive_settings_v1'
};

export const getStoredData = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

export const setStoredData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

export const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    setStoredData(STORAGE_KEYS.SERVICES, initialServices);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROVIDERS)) {
    setStoredData(STORAGE_KEYS.PROVIDERS, initialProviders);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    setStoredData(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    setStoredData(STORAGE_KEYS.BOOKINGS, initialBookings);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    setStoredData(STORAGE_KEYS.REVIEWS, initialReviews);
  }
  if (!localStorage.getItem(STORAGE_KEYS.FAQS)) {
    setStoredData(STORAGE_KEYS.FAQS, initialFaqs);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
    setStoredData(STORAGE_KEYS.PRICING, defaultPricingConfig);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    setStoredData(STORAGE_KEYS.SETTINGS, {
      whatsappNumber: '+91 98112 00990',
      supportEmail: 'care@helphive.in',
      supportPhone: '1800-419-4483',
      cityAvailability: ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune']
    });
  }
};

export const resetStorageToDefaults = () => {
  setStoredData(STORAGE_KEYS.SERVICES, initialServices);
  setStoredData(STORAGE_KEYS.PROVIDERS, initialProviders);
  setStoredData(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  setStoredData(STORAGE_KEYS.BOOKINGS, initialBookings);
  setStoredData(STORAGE_KEYS.REVIEWS, initialReviews);
  setStoredData(STORAGE_KEYS.FAQS, initialFaqs);
  setStoredData(STORAGE_KEYS.PRICING, defaultPricingConfig);
  setStoredData(STORAGE_KEYS.SETTINGS, {
    whatsappNumber: '+91 98112 00990',
    supportEmail: 'care@helphive.in',
    supportPhone: '1800-419-4483',
    cityAvailability: ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune']
  });
};

export { STORAGE_KEYS };
