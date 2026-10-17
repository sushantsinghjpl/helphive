import { DurationPlan, BookingPricing, PricingConfig } from '../../types';
import { getStoredData, STORAGE_KEYS } from './storage';
import { defaultPricingConfig } from '../../data/mockData';

export interface CalculatePriceParams {
  plan: DurationPlan;
  dateStr?: string;
  timeSlot?: string;
  couponCode?: string;
}

export const calculateBookingPrice = (params: CalculatePriceParams): BookingPricing => {
  const config = getStoredData<PricingConfig>(STORAGE_KEYS.PRICING, defaultPricingConfig);
  const basePrice = params.plan.price;

  let surgeFee = 0;

  // Check if night time slot (8 PM to 6 AM)
  if (params.timeSlot) {
    const isNight =
      params.timeSlot.includes('PM') && (
        params.timeSlot.includes('08:') ||
        params.timeSlot.includes('09:') ||
        params.timeSlot.includes('10:') ||
        params.timeSlot.includes('11:')
      ) ||
      params.timeSlot.includes('AM') && (
        params.timeSlot.includes('12:') ||
        params.timeSlot.includes('01:') ||
        params.timeSlot.includes('02:') ||
        params.timeSlot.includes('03:') ||
        params.timeSlot.includes('04:') ||
        params.timeSlot.includes('05:')
      );

    if (isNight) {
      surgeFee += Math.round((basePrice * config.nightChargePercentage) / 100);
    }
  }

  // Check if weekend (Saturday or Sunday)
  if (params.dateStr) {
    const dateObj = new Date(params.dateStr);
    const day = dateObj.getDay();
    if (day === 0 || day === 6) { // 0=Sun, 6=Sat
      surgeFee += Math.round((basePrice * config.weekendSurgePercentage) / 100);
    }
  }

  const platformFee = config.platformFee;
  const taxableAmount = basePrice + surgeFee + platformFee;
  const tax = Math.round((taxableAmount * config.gstPercentage) / 100);

  // Apply Coupon Discount if valid
  let discount = 0;
  if (params.couponCode) {
    const cleanCoupon = params.couponCode.trim().toUpperCase();
    const foundCoupon = config.coupons.find(c => c.code.toUpperCase() === cleanCoupon);
    if (foundCoupon && basePrice >= foundCoupon.minBookingAmount) {
      const calculatedDiscount = Math.round((basePrice * foundCoupon.discountPercentage) / 100);
      discount = Math.min(calculatedDiscount, foundCoupon.maxDiscount);
    }
  }

  const total = Math.max(0, taxableAmount + tax - discount);

  return {
    basePrice,
    surgeFee,
    platformFee,
    tax,
    discount,
    total
  };
};
