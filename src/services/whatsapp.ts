import { getStoredData, STORAGE_KEYS } from './api/storage';

export interface WhatsAppConfig {
  whatsappNumber: string;
  supportEmail: string;
  supportPhone: string;
  cityAvailability: string[];
}

export const getAppSettings = (): WhatsAppConfig => {
  return getStoredData<WhatsAppConfig>(STORAGE_KEYS.SETTINGS, {
    whatsappNumber: '+919811200990',
    supportEmail: 'care@helphive.in',
    supportPhone: '1800-419-4483',
    cityAvailability: ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune']
  });
};

export const getWhatsAppLink = (messageText: string = 'Hello HelpHive, I need assistance with a booking.'): string => {
  const settings = getAppSettings();
  // Strip non-numeric characters for WhatsApp API URL
  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};
