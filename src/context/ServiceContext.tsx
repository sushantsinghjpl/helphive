import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service } from '../types';
import { serviceApi } from '../services/api/serviceApi';
import { initStorage } from '../services/api/storage';

interface ServiceContextType {
  services: Service[];
  allAdminServices: Service[];
  loading: boolean;
  refreshServices: () => Promise<void>;
  createService: (service: Omit<Service, 'id' | 'createdDate'>) => Promise<Service>;
  updateService: (id: string, updates: Partial<Service>) => Promise<Service>;
  toggleStatus: (id: string) => Promise<Service>;
  deleteService: (id: string) => Promise<boolean>;
  duplicateService: (id: string) => Promise<Service>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [allAdminServices, setAllAdminServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    initStorage();
    setLoading(true);
    try {
      const active = await serviceApi.getServices();
      const all = await serviceApi.getAdminServices();
      setServices(active);
      setAllAdminServices(all);
    } catch (e) {
      console.error('Failed to load services:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const refreshServices = async () => {
    await load();
  };

  const createService = async (newService: Omit<Service, 'id' | 'createdDate'>) => {
    const created = await serviceApi.createService(newService);
    await load();
    return created;
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    const updated = await serviceApi.updateService(id, updates);
    await load();
    return updated;
  };

  const toggleStatus = async (id: string) => {
    const updated = await serviceApi.toggleServiceStatus(id);
    await load();
    return updated;
  };

  const deleteService = async (id: string) => {
    const res = await serviceApi.deleteService(id);
    await load();
    return res;
  };

  const duplicateService = async (id: string) => {
    const res = await serviceApi.duplicateService(id);
    await load();
    return res;
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        allAdminServices,
        loading,
        refreshServices,
        createService,
        updateService,
        toggleStatus,
        deleteService,
        duplicateService
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};
