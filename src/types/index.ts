// Core type definitions for the ride-hailing platform

export type UserRole = 'USER' | 'DRIVER' | 'OWNER';

export type RideStatus = 
  | 'PENDING' 
  | 'ASSIGNED' 
  | 'DRIVER_ARRIVING' 
  | 'STARTED' 
  | 'COMPLETED' 
  | 'CANCELLED';

export type DriverStatus = 'ONLINE' | 'OFFLINE' | 'ON_RIDE';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  status: DriverStatus;
  vehicleNumber: string;
  vehicleModel: string;
  rating: number;
  totalRides: number;
  isActive: boolean;
  currentLocation?: LatLng;
  ownerId: string;
  createdAt: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  coordinates: LatLng;
}

export interface FareEstimate {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  totalFare: number;
  currency: string;
  estimatedTime: number; // minutes
  estimatedDistance: number; // km
}

export interface Ride {
  id: string;
  userId: string;
  driverId?: string;
  driver?: Driver;
  pickup: Location;
  dropoff: Location;
  status: RideStatus;
  fare?: FareEstimate;
  finalFare?: number;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  rating?: number;
  createdAt: string;
}

export interface Earnings {
  today: number;
  week: number;
  month: number;
  total: number;
  currency: string;
  rides: number;
}

export interface Analytics {
  totalRides: number;
  activeDrivers: number;
  totalRevenue: number;
  completionRate: number;
  averageRating: number;
  ridesPerDay: { date: string; count: number }[];
  revenuePerDay: { date: string; amount: number }[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
