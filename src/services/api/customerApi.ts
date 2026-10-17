import { Customer, SavedAddress } from '../../types';
import { getStoredData, setStoredData, STORAGE_KEYS } from './storage';
import { initialCustomers } from '../../data/mockData';

export const customerApi = {
  async getCustomers(): Promise<Customer[]> {
    return getStoredData<Customer[]>(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    const customers = getStoredData<Customer[]>(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    return customers.find(c => c.id === id) || null;
  },

  async getCurrentUser(): Promise<Customer> {
    const customers = getStoredData<Customer[]>(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    return customers[0]; // Amitabh Sen as default logged in user for demo
  },

  async addSavedAddress(customerId: string, address: Omit<SavedAddress, 'id'>): Promise<Customer> {
    const customers = getStoredData<Customer[]>(STORAGE_KEYS.CUSTOMERS, initialCustomers);
    const index = customers.findIndex(c => c.id === customerId);
    if (index === -1) throw new Error('Customer not found');

    const newAddr: SavedAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };

    customers[index].savedAddresses.push(newAddr);
    setStoredData(STORAGE_KEYS.CUSTOMERS, customers);
    return customers[index];
  }
};
