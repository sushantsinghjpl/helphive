import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types';
import { customerApi } from '../services/api/customerApi';

interface AuthContextType {
  customer: Customer | null;
  isAdmin: boolean;
  adminEmail: string | null;
  pendingPhone: string | null;
  isAuthenticated: boolean;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  quickDemoLogin: (type: 'customer' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  useEffect(() => {
    // Check saved session
    const savedCustomer = localStorage.getItem('helphive_auth_customer');
    const savedAdmin = localStorage.getItem('helphive_auth_admin');

    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (e) {
        localStorage.removeItem('helphive_auth_customer');
      }
    }

    if (savedAdmin === 'true') {
      setIsAdmin(true);
      setAdminEmail('admin@helphive.in');
    }
  }, []);

  const sendOtp = async (phone: string): Promise<boolean> => {
    setPendingPhone(phone);
    return true;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Demo OTP is 123456 or any 6-digit number
    if (otp.length === 6) {
      const allCustomers = await customerApi.getCustomers();
      // Match customer or use default
      const matched = allCustomers.find(c => c.phone.replace(/[^0-9]/g, '').includes(pendingPhone?.replace(/[^0-9]/g, '') || '')) || allCustomers[0];
      setCustomer(matched);
      localStorage.setItem('helphive_auth_customer', JSON.stringify(matched));
      setPendingPhone(null);
      return true;
    }
    return false;
  };

  const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
    if (email.toLowerCase() === 'admin@helphive.in' && pass === 'admin123') {
      setIsAdmin(true);
      setAdminEmail(email);
      localStorage.setItem('helphive_auth_admin', 'true');
      return true;
    }
    // Also allow quick access if email contains "admin"
    if (email.includes('admin') && pass.length >= 4) {
      setIsAdmin(true);
      setAdminEmail(email);
      localStorage.setItem('helphive_auth_admin', 'true');
      return true;
    }
    return false;
  };

  const quickDemoLogin = async (type: 'customer' | 'admin') => {
    if (type === 'admin') {
      setIsAdmin(true);
      setAdminEmail('admin@helphive.in');
      localStorage.setItem('helphive_auth_admin', 'true');
    } else {
      const defaultCust = await customerApi.getCurrentUser();
      setCustomer(defaultCust);
      localStorage.setItem('helphive_auth_customer', JSON.stringify(defaultCust));
    }
  };

  const logout = () => {
    setCustomer(null);
    setIsAdmin(false);
    setAdminEmail(null);
    setPendingPhone(null);
    localStorage.removeItem('helphive_auth_customer');
    localStorage.removeItem('helphive_auth_admin');
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAdmin,
        adminEmail,
        pendingPhone,
        isAuthenticated: !!customer || isAdmin,
        sendOtp,
        verifyOtp,
        loginAdmin,
        quickDemoLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
