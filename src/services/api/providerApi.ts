import { Provider } from '../../types';
import { getStoredData, setStoredData, STORAGE_KEYS } from './storage';
import { initialProviders } from '../../data/mockData';

export const providerApi = {
  async getProviders(): Promise<Provider[]> {
    return getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
  },

  async getProviderById(id: string): Promise<Provider | null> {
    const providers = getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
    return providers.find(p => p.id === id) || null;
  },

  async updateProviderStatus(id: string, verificationStatus: Provider['verificationStatus']): Promise<Provider> {
    const providers = getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
    const index = providers.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Provider not found');

    providers[index].verificationStatus = verificationStatus;
    setStoredData(STORAGE_KEYS.PROVIDERS, providers);
    return providers[index];
  },

  async addProvider(provider: Omit<Provider, 'id'>): Promise<Provider> {
    const providers = getStoredData<Provider[]>(STORAGE_KEYS.PROVIDERS, initialProviders);
    const newProv: Provider = {
      ...provider,
      id: `prov-${Date.now()}`
    };
    setStoredData(STORAGE_KEYS.PROVIDERS, [newProv, ...providers]);
    return newProv;
  }
};
