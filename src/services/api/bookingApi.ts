import { Booking, BookingStatus, TimelineStep, Provider } from '../../types';
import { getStoredData, setStoredData, STORAGE_KEYS } from './storage';
import { initialBookings, initialProviders } from '../../data/mockData';

export const bookingApi = {
  async getBookings(): Promise<Booking[]> {
    return getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
  },

  async getBookingById(id: string): Promise<Booking | null> {
    const bookings = getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    return bookings.find(b => b.id.toLowerCase() === id.toLowerCase()) || null;
  },

  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'timeline'>): Promise<Booking> {
    const bookings = getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const providers = getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const id = `HH-${randomNum}`;
    const now = new Date();
    const timeFormatted = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Assign a matching provider if available
    const assignedProvider = providers.find(p => p.availability === 'available') || providers[0];

    const initialTimeline: TimelineStep[] = [
      {
        status: 'confirmed',
        label: 'Booking Confirmed',
        timestamp: timeFormatted,
        note: 'Order confirmed & slot reserved',
        done: true
      },
      {
        status: 'provider_assigned',
        label: 'Provider Assigned',
        timestamp: timeFormatted,
        note: `${assignedProvider.name} assigned (${assignedProvider.rating}★)`,
        done: true
      },
      {
        status: 'on_the_way',
        label: 'Provider On The Way',
        timestamp: 'Estimated soon',
        note: 'Assistant will arrive at destination',
        done: false,
        current: true
      },
      {
        status: 'arrived',
        label: 'Provider Arrived',
        timestamp: 'Pending',
        note: 'OTP check-in at location',
        done: false
      },
      {
        status: 'in_progress',
        label: 'Service In Progress',
        timestamp: 'Pending',
        note: 'Assistance actively underway',
        done: false
      },
      {
        status: 'completed',
        label: 'Service Completed',
        timestamp: 'Pending',
        note: 'Care handed over safely',
        done: false
      }
    ];

    const newBooking: Booking = {
      ...bookingData,
      id,
      provider: assignedProvider,
      status: 'confirmed',
      timeline: initialTimeline,
      createdAt: new Date().toISOString()
    };

    setStoredData(STORAGE_KEYS.BOOKINGS, [newBooking, ...bookings]);
    return newBooking;
  },

  async updateBookingStatus(id: string, newStatus: BookingStatus, note?: string): Promise<Booking> {
    const bookings = getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Booking not found');

    const booking = bookings[index];
    const now = new Date();
    const timeFormatted = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    // Update timeline steps
    const updatedTimeline = booking.timeline.map(step => {
      if (step.status === newStatus) {
        return { ...step, done: true, current: true, timestamp: timeFormatted, note: note || step.note };
      }
      return step;
    });

    const updatedBooking: Booking = {
      ...booking,
      status: newStatus,
      timeline: updatedTimeline
    };

    bookings[index] = updatedBooking;
    setStoredData(STORAGE_KEYS.BOOKINGS, bookings);
    return updatedBooking;
  },

  async assignProvider(bookingId: string, providerId: string): Promise<Booking> {
    const bookings = getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const providers = getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
    const booking = bookings.find(b => b.id === bookingId);
    const provider = providers.find(p => p.id === providerId);

    if (!booking) throw new Error('Booking not found');
    if (!provider) throw new Error('Provider not found');

    booking.provider = provider;
    booking.status = 'provider_assigned';
    setStoredData(STORAGE_KEYS.BOOKINGS, bookings);
    return booking;
  },

  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    return this.updateBookingStatus(id, 'cancelled', reason || 'Cancelled by customer');
  },

  async rateBooking(id: string, score: number, comment: string): Promise<Booking> {
    const bookings = getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const booking = bookings.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    booking.rating = {
      score,
      comment,
      createdAt: new Date().toISOString()
    };
    setStoredData(STORAGE_KEYS.BOOKINGS, bookings);
    return booking;
  },

  async getAdminStats() {
    const bookings = getStoredData<Booking[]>(STORAGE_KEYS.BOOKINGS, initialBookings);
    const providers = getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
    const customers = getStoredData<any[]>(STORAGE_KEYS.CUSTOMERS, []);

    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => ['confirmed', 'provider_assigned', 'on_the_way', 'arrived', 'in_progress'].includes(b.status)).length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.payment.status === 'paid' && b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.pricing.total, 0);

    const cancellationRate = totalBookings > 0 ? Math.round((cancelledBookings / totalBookings) * 100) : 0;

    return {
      totalBookings,
      activeBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      cancellationRate,
      totalProviders: providers.length,
      verifiedProviders: providers.filter(p => p.verificationStatus === 'verified').length,
      totalCustomers: customers.length
    };
  }
};
