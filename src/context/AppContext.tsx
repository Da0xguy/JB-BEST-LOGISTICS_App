import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  Shipment,
  MailboxRental,
  DeliveryJob,
  JobStatus,
  Invoice,
  AppNotification,
  Appointment,
} from '../types/logistics';
import {
  initialShipments,
  initialMailbox,
  initialRiderJobs,
  initialInvoices,
  initialNotifications,
} from '../data/mockData';

export type DeviceFrame = 'pixel' | 'iphone' | 'galaxy' | 'fullscreen';
export type AppTheme = 'navy' | 'light';
export type AppCurrency = 'USD' | 'NGN';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  deviceFrame: DeviceFrame;
  setDeviceFrame: (frame: DeviceFrame) => void;
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  currency: AppCurrency;
  setCurrency: (c: AppCurrency) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;

  // Authentication State
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;

  // Active Customer Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Shipments & Tracking
  shipments: Shipment[];
  activeTrackingId: string;
  setActiveTrackingId: (id: string) => void;
  createNewShipment: (shipment: Partial<Shipment>) => Shipment;
  getShipment: (trackingNumber: string) => Shipment | undefined;

  // Mailbox
  mailbox: MailboxRental;
  pickupMailboxItem: (itemId: string) => void;

  // Rider Jobs
  riderJobs: DeliveryJob[];
  advanceJobStatus: (jobId: string) => void;

  // Invoices & Payments
  invoices: Invoice[];
  payInvoice: (invoiceId: string, amount: number) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (serviceType: string, date: string, time: string, name: string, phone: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationsAsRead: () => void;
  unreadCount: number;

  // Global Modals & Utilities
  isQrScannerOpen: boolean;
  setIsQrScannerOpen: (open: boolean) => void;
  lastScannedResult: string | null;
  setLastScannedResult: (res: string | null) => void;
  isFlutterCodeDrawerOpen: boolean;
  setIsFlutterCodeDrawerOpen: (open: boolean) => void;

  // Format currency helper
  formatMoney: (amountInUSD: number, amountInNGN?: number) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>('pixel');
  const [theme, setTheme] = useState<AppTheme>('light');
  const [currency, setCurrency] = useState<AppCurrency>('USD');
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const loginAs = (targetRole: UserRole) => {
    setRole(targetRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const [activeTab, setActiveTab] = useState<string>('home');
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('JB-8829-US');
  const [mailbox, setMailbox] = useState<MailboxRental>(initialMailbox);
  const [riderJobs, setRiderJobs] = useState<DeliveryJob[]>(initialRiderJobs);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt_1',
      serviceType: 'notary',
      serviceName: 'Georgia Notary Public',
      price: '$10 / signature',
      date: 'Today, Sep 28',
      timeSlot: '3:30 PM - 3:45 PM',
      customerName: 'Ayobami Oketona',
      customerPhone: '+1 (404) 555-0192',
      status: 'confirmed',
    },
  ]);

  const [isQrScannerOpen, setIsQrScannerOpen] = useState<boolean>(false);
  const [lastScannedResult, setLastScannedResult] = useState<string | null>(null);
  const [isFlutterCodeDrawerOpen, setIsFlutterCodeDrawerOpen] = useState<boolean>(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatMoney = (amountInUSD: number, amountInNGN?: number) => {
    if (currency === 'NGN') {
      const ngnVal = amountInNGN ?? Math.round(amountInUSD * 1550);
      return `₦${ngnVal.toLocaleString()}`;
    }
    return `$${amountInUSD.toFixed(2)}`;
  };

  const getShipment = (trackingNumber: string) => {
    return shipments.find(
      (s) =>
        s.trackingNumber.toLowerCase() === trackingNumber.trim().toLowerCase() ||
        s.id.toLowerCase() === trackingNumber.trim().toLowerCase()
    );
  };

  const createNewShipment = (data: Partial<Shipment>): Shipment => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `JB-${randomDigits}-US`;
    const newShp: Shipment = {
      id: `shp_${Date.now()}`,
      trackingNumber,
      carrier: data.carrier || 'fedex',
      serviceLevel: data.serviceLevel || 'FedEx 2Day Air',
      senderName: data.senderName || 'Sender',
      senderPhone: data.senderPhone || '',
      senderAddress: data.senderAddress || '2450 Piedmont Rd NE',
      senderCity: data.senderCity || 'Atlanta',
      senderState: data.senderState || 'GA',
      recipientName: data.recipientName || 'Recipient',
      recipientPhone: data.recipientPhone || '',
      recipientAddress: data.recipientAddress || 'Street',
      recipientCity: data.recipientCity || 'City',
      recipientState: data.recipientState || 'State',
      packageType: data.packageType || 'box',
      weightLbs: data.weightLbs || 2.5,
      declaredValue: data.declaredValue || 100,
      isFragile: data.isFragile || false,
      currentStatus: 'order_created',
      currentLocation: {
        latitude: 33.8228,
        longitude: -84.3688,
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
        facilityName: 'JB Piedmont Store Counter',
      },
      originLocation: {
        latitude: 33.8228,
        longitude: -84.3688,
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
      },
      destinationLocation: {
        latitude: 33.7490,
        longitude: -84.3880,
        city: data.recipientCity || 'Atlanta',
        state: data.recipientState || 'GA',
        country: 'USA',
      },
      estimatedDelivery: 'Tomorrow by 4:30 PM',
      totalAmount: data.totalAmount || 35.0,
      currency: currency,
      createdAt: new Date().toISOString(),
      trackingLogs: [
        {
          id: `log_${Date.now()}`,
          shipmentId: `shp_${Date.now()}`,
          status: 'order_created',
          title: 'Order Placed & Barcode Printed',
          description: 'Package accepted at counter, thermal label printed.',
          location: {
            latitude: 33.8228,
            longitude: -84.3688,
            city: 'Atlanta',
            state: 'GA',
            country: 'USA',
            facilityName: 'JB & Best Counter',
          },
          timestamp: 'Just now',
        },
      ],
    };

    setShipments((prev) => [newShp, ...prev]);
    setActiveTrackingId(trackingNumber);

    // Also trigger notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'New Shipment Created',
        message: `Tracking ID ${trackingNumber} has been generated. Cutoff time is 5:30 PM today.`,
        category: 'shipment',
        timestamp: 'Just now',
        read: false,
        trackingId: trackingNumber,
      },
      ...prev,
    ]);

    return newShp;
  };

  const pickupMailboxItem = (itemId: string) => {
    setMailbox((prev) => ({
      ...prev,
      currentOccupancy: Math.max(0, prev.currentOccupancy - 1),
      packages: prev.packages.filter((p) => p.id !== itemId),
    }));

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Mailbox Package Collected',
        message: `Verified pickup completed for item #${itemId}. Your box now has ${Math.max(0, mailbox.currentOccupancy - 1)} / ${mailbox.capacity} units occupied.`,
        category: 'mailbox',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const advanceJobStatus = (jobId: string) => {
    const sequence: JobStatus[] = [
      'assigned',
      'accepted',
      'arrived_at_pickup',
      'picked_up',
      'in_transit',
      'arrived',
      'delivered',
    ];

    setRiderJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        const currentIndex = sequence.indexOf(job.status);
        if (currentIndex < sequence.length - 1) {
          const nextStatus = sequence[currentIndex + 1];
          return {
            ...job,
            status: nextStatus,
          };
        }
        return job;
      })
    );
  };

  const payInvoice = (invoiceId: string, amount: number) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== invoiceId) return inv;
        const newPaid = inv.paidAmount + amount;
        const newBalance = Math.max(0, inv.totalAmount - newPaid);
        return {
          ...inv,
          paidAmount: newPaid,
          balance: newBalance,
          status: newBalance === 0 ? 'PAID' : 'PARTIALLY PAID',
        };
      })
    );

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Payment Succeeded',
        message: `Receipt generated for ${formatMoney(amount)}. Payment processed securely.`,
        category: 'payment',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const bookAppointment = (
    serviceType: string,
    date: string,
    time: string,
    name: string,
    phone: string
  ) => {
    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      serviceType,
      serviceName:
        serviceType === 'notary'
          ? 'Georgia Notary Public'
          : serviceType === 'mailbox_rental'
          ? 'Private Mailbox Rental'
          : serviceType === 'fingerprinting'
          ? 'Livescan Fingerprinting'
          : 'Multi-Carrier Shipping',
      price: serviceType === 'notary' ? '$10' : serviceType === 'mailbox_rental' ? '$25+' : 'Rates vary',
      date,
      timeSlot: time,
      customerName: name,
      customerPhone: phone,
      status: 'confirmed',
    };

    setAppointments((prev) => [newApt, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Appointment Reserved',
        message: `In-store booking for ${newApt.serviceName} confirmed for ${date} at ${time}.`,
        category: 'pickup',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        setIsAuthenticated,
        loginAs,
        logout,
        deviceFrame,
        setDeviceFrame,
        theme,
        setTheme,
        currency,
        setCurrency,
        isOffline,
        setIsOffline,
        activeTab,
        setActiveTab,
        shipments,
        activeTrackingId,
        setActiveTrackingId,
        createNewShipment,
        getShipment,
        mailbox,
        pickupMailboxItem,
        riderJobs,
        advanceJobStatus,
        invoices,
        payInvoice,
        appointments,
        bookAppointment,
        notifications,
        markNotificationsAsRead,
        unreadCount,
        isQrScannerOpen,
        setIsQrScannerOpen,
        lastScannedResult,
        setLastScannedResult,
        isFlutterCodeDrawerOpen,
        setIsFlutterCodeDrawerOpen,
        formatMoney,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
