export type UserRole = 'customer' | 'rider' | 'staff' | 'admin';

export type Carrier = 'fedex' | 'ups' | 'usps' | 'jb_freight' | 'dhl';

export type ShipmentStatus =
  | 'order_created'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception'
  | 'returned';

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  facilityName?: string;
}

export interface TrackingLog {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  title: string;
  description: string;
  location: GeoCoordinate;
  timestamp: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  carrier: Carrier;
  serviceLevel: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  packageType: 'box' | 'envelope' | 'pallet' | 'custom_crate' | 'document';
  weightLbs: number;
  declaredValue: number;
  isFragile?: boolean;
  currentStatus: ShipmentStatus;
  currentLocation: GeoCoordinate;
  originLocation: GeoCoordinate;
  destinationLocation: GeoCoordinate;
  estimatedDelivery: string;
  actualDelivery?: string;
  trackingLogs: TrackingLog[];
  totalAmount: number;
  currency: 'USD' | 'NGN';
  createdAt: string;
}

export interface MailboxItem {
  id: string;
  sender: string;
  description: string;
  receivedDate: string;
  barcode: string;
  readyForPickup: boolean;
  carrier: string;
}

export interface MailboxRental {
  boxNumber: string;
  renterName: string;
  companyName?: string;
  tier: 'Personal' | 'Business' | 'Corporate 24/7';
  capacity: number;
  currentOccupancy: number;
  renewalDate: string;
  keyFobId: string;
  packages: MailboxItem[];
}

export type JobStatus =
  | 'assigned'
  | 'accepted'
  | 'arrived_at_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'arrived'
  | 'delivered';

export interface DeliveryJob {
  id: string;
  trackingNumber: string;
  pickupAddress: string;
  pickupNeighborhood: string;
  destinationAddress: string;
  destinationNeighborhood: string;
  packageSize: 'Small Parcel (Bike)' | 'Medium Parcel (Van)' | 'Large Cargo (Truck)';
  distanceKm: number;
  etaMinutes: number;
  payoutAmountUSD: number;
  payoutAmountNGN: number;
  status: JobStatus;
  customerName: string;
  customerPhone: string;
  specialInstructions?: string;
}

export interface Appointment {
  id: string;
  serviceType: string;
  serviceName: string;
  price: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  shipmentId: string;
  customerName: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  currency: 'USD' | 'NGN';
  status: 'PAID' | 'PARTIALLY PAID' | 'DRAFT' | 'OVERDUE';
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export interface LinehaulCutoff {
  carrier: Carrier;
  name: string;
  cutoffTime: string;
  driverEta: string;
  status: 'ON SCHEDULE' | 'MANIFEST READY' | 'DEPARTED';
  packagesReady: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: 'shipment' | 'payment' | 'mailbox' | 'pickup' | 'system';
  timestamp: string;
  read: boolean;
  trackingId?: string;
}
