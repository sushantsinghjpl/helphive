import { Service, ServiceCategory } from '../../types';
import { getStoredData, setStoredData, STORAGE_KEYS } from './storage';
import { initialServices } from '../../data/mockData';

export const serviceApi = {
  // Public GET active services
  async getServices(params?: { category?: string; search?: string; minPrice?: number; maxPrice?: number }): Promise<Service[]> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    let filtered = services.filter(s => s.status === 'active');

    if (params?.category && params.category !== 'All') {
      filtered = filtered.filter(s => s.category.toLowerCase() === params.category?.toLowerCase());
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.shortDescription.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }

    if (params?.minPrice !== undefined) {
      filtered = filtered.filter(s => s.basePrice >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      filtered = filtered.filter(s => s.basePrice <= params.maxPrice!);
    }

    return filtered;
  },

  // Public GET single service by slug
  async getServiceBySlug(slug: string): Promise<Service | null> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const service = services.find(s => s.slug === slug);
    return service || null;
  },

  // Admin GET all services (active + inactive + draft)
  async getAdminServices(): Promise<Service[]> {
    return getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
  },

  // Admin POST create service
  async createService(newService: Omit<Service, 'id' | 'createdDate'>): Promise<Service> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const id = `srv-${Date.now()}`;
    const created: Service = {
      ...newService,
      id,
      createdDate: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0
    };
    const updated = [created, ...services];
    setStoredData(STORAGE_KEYS.SERVICES, updated);
    return created;
  },

  // Admin PUT update service
  async updateService(id: string, updates: Partial<Service>): Promise<Service> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const index = services.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Service not found');

    const updatedService = { ...services[index], ...updates };
    services[index] = updatedService;
    setStoredData(STORAGE_KEYS.SERVICES, services);
    return updatedService;
  },

  // Admin Toggle Enable/Disable
  async toggleServiceStatus(id: string): Promise<Service> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const service = services.find(s => s.id === id);
    if (!service) throw new Error('Service not found');

    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    return this.updateService(id, { status: newStatus });
  },

  // Admin DELETE service
  async deleteService(id: string): Promise<boolean> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const filtered = services.filter(s => s.id !== id);
    setStoredData(STORAGE_KEYS.SERVICES, filtered);
    return true;
  },

  // Duplicate service
  async duplicateService(id: string): Promise<Service> {
    const services = getStoredData<Service[]>(STORAGE_KEYS.SERVICES, initialServices);
    const original = services.find(s => s.id === id);
    if (!original) throw new Error('Service not found');

    const copy: Service = {
      ...original,
      id: `srv-${Date.now()}`,
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'draft'
    };
    setStoredData(STORAGE_KEYS.SERVICES, [copy, ...services]);
    return copy;
  }
};
