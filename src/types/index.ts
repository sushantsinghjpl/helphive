export type ServiceCategory = 'Hospital' | 'Care' | 'Personal Assistance' | 'Driver' | 'Urgent Help' | 'Other';

export interface DurationPlan {
  id: string;
  name: string;
  hours: number;
  price: number;
  savingsPercent?: number;
  popular?: boolean;
  description?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  basePrice: number;
  pricingUnit: string;
  available: boolean;
  popular?: boolean;
  badge?: string;
  features: string[];
  exclusions: string[];
  plans: DurationPlan[];
  faqs: ServiceFAQ[];
  status: 'active' | 'inactive' | 'draft';
  rating: number;
  reviewCount: number;
  createdDate: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'provider_assigned'
  | 'on_the_way'
  | 'arrived'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Provider {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  location: string;
  languages: string[];
  services: string[];
  availability: 'available' | 'on_duty' | 'offline';
  rating: number;
  reviewCount: number;
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'suspended';
  experienceYears: number;
  policeVerificationDone: boolean;
  idVerified: boolean;
  eta?: string;
  completedTasks: number;
}

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate?: string;
  status: 'active' | 'inactive';
  savedAddresses: SavedAddress[];
}

export interface TimelineStep {
  status: BookingStatus;
  label: string;
  timestamp: string;
  note?: string;
  done: boolean;
  current?: boolean;
}

export interface BookingPricing {
  basePrice: number;
  surgeFee: number;
  platformFee: number;
  tax: number;
  discount: number;
  total: number;
}

export interface BookingPayment {
  method: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';
  status: 'paid' | 'pending' | 'refunded';
  transactionId?: string;
  paidAt?: string;
}

export interface BookingCustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  patientName?: string;
  emergencyContact?: string;
  specialInstructions?: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceSlug: string;
  serviceIcon: string;
  planId: string;
  planName: string;
  hours: number;
  date: string;
  timeSlot: string;
  customer: BookingCustomerDetails;
  provider?: Provider;
  status: BookingStatus;
  timeline: TimelineStep[];
  pricing: BookingPricing;
  payment: BookingPayment;
  createdAt: string;
  rating?: {
    score: number;
    comment: string;
    createdAt: string;
  };
}

export interface Review {
  id: string;
  serviceId: string;
  serviceName: string;
  providerId?: string;
  providerName?: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface GlobalFAQ {
  id: string;
  category: 'general' | 'hospital' | 'booking' | 'payment' | 'safety' | 'cancellation' | 'driver';
  serviceId?: string;
  question: string;
  answer: string;
}

export interface PricingConfig {
  nightChargePercentage: number;
  weekendSurgePercentage: number;
  platformFee: number;
  gstPercentage: number;
  coupons: {
    code: string;
    discountPercentage: number;
    maxDiscount: number;
    minBookingAmount: number;
  }[];
}
