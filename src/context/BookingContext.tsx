import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus } from '../types';
import { bookingApi } from '../services/api/bookingApi';
import { initStorage } from '../services/api/storage';

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  refreshBookings: () => Promise<void>;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'timeline'>) => Promise<Booking>;
  updateStatus: (id: string, status: BookingStatus, note?: string) => Promise<Booking>;
  advanceStatus: (id: string) => Promise<Booking>;
  rateBooking: (id: string, score: number, comment: string) => Promise<Booking>;
  cancelBooking: (id: string, reason?: string) => Promise<Booking>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STATUS_SEQUENCE: BookingStatus[] = [
  'pending',
  'confirmed',
  'provider_assigned',
  'on_the_way',
  'arrived',
  'in_progress',
  'completed'
];

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    initStorage();
    setLoading(true);
    try {
      const data = await bookingApi.getBookings();
      setBookings(data);
    } catch (e) {
      console.error('Failed to load bookings:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const refreshBookings = async () => {
    await load();
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'timeline'>) => {
    const created = await bookingApi.createBooking(bookingData);
    await load();
    return created;
  };

  const updateStatus = async (id: string, status: BookingStatus, note?: string) => {
    const updated = await bookingApi.updateBookingStatus(id, status, note);
    await load();
    return updated;
  };

  const advanceStatus = async (id: string) => {
    const current = bookings.find(b => b.id === id);
    if (!current) throw new Error('Booking not found');

    const currentIndex = STATUS_SEQUENCE.indexOf(current.status);
    if (currentIndex >= 0 && currentIndex < STATUS_SEQUENCE.length - 1) {
      const nextStatus = STATUS_SEQUENCE[currentIndex + 1];
      const updated = await updateStatus(id, nextStatus, `Simulated transition to ${nextStatus}`);
      return updated;
    }
    return current;
  };

  const rateBooking = async (id: string, score: number, comment: string) => {
    const updated = await bookingApi.rateBooking(id, score, comment);
    await load();
    return updated;
  };

  const cancelBooking = async (id: string, reason?: string) => {
    const updated = await bookingApi.cancelBooking(id, reason);
    await load();
    return updated;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        refreshBookings,
        createBooking,
        updateStatus,
        advanceStatus,
        rateBooking,
        cancelBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
