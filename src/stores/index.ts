import { create } from 'zustand';
import { Ride, RideStatus, FareEstimate, Location, LatLng, Driver, DriverStatus, Earnings } from '@/types';

// Ride store for User app
interface RideStore {
  currentRide: Ride | null;
  fareEstimate: FareEstimate | null;
  pickup: Location | null;
  dropoff: Location | null;
  driverLocation: LatLng | null;
  rideHistory: Ride[];
  isBooking: boolean;
  setPickup: (loc: Location) => void;
  setDropoff: (loc: Location) => void;
  setFareEstimate: (fare: FareEstimate | null) => void;
  setCurrentRide: (ride: Ride | null) => void;
  setDriverLocation: (loc: LatLng | null) => void;
  setRideHistory: (rides: Ride[]) => void;
  setIsBooking: (val: boolean) => void;
  updateRideStatus: (status: RideStatus) => void;
  reset: () => void;
}

export const useRideStore = create<RideStore>((set) => ({
  currentRide: null,
  fareEstimate: null,
  pickup: null,
  dropoff: null,
  driverLocation: null,
  rideHistory: [],
  isBooking: false,
  setPickup: (loc) => set({ pickup: loc }),
  setDropoff: (loc) => set({ dropoff: loc }),
  setFareEstimate: (fare) => set({ fareEstimate: fare }),
  setCurrentRide: (ride) => set({ currentRide: ride }),
  setDriverLocation: (loc) => set({ driverLocation: loc }),
  setRideHistory: (rides) => set({ rideHistory: rides }),
  setIsBooking: (val) => set({ isBooking: val }),
  updateRideStatus: (status) =>
    set((s) => ({ currentRide: s.currentRide ? { ...s.currentRide, status } : null })),
  reset: () => set({ currentRide: null, fareEstimate: null, pickup: null, dropoff: null, driverLocation: null, isBooking: false }),
}));

// Driver store
interface DriverStore {
  status: DriverStatus;
  currentRide: Ride | null;
  earnings: Earnings | null;
  rideHistory: Ride[];
  setStatus: (s: DriverStatus) => void;
  setCurrentRide: (ride: Ride | null) => void;
  setEarnings: (e: Earnings) => void;
  setRideHistory: (rides: Ride[]) => void;
}

export const useDriverStore = create<DriverStore>((set) => ({
  status: 'OFFLINE',
  currentRide: null,
  earnings: null,
  rideHistory: [],
  setStatus: (status) => set({ status }),
  setCurrentRide: (ride) => set({ currentRide: ride }),
  setEarnings: (earnings) => set({ earnings }),
  setRideHistory: (rides) => set({ rideHistory: rides }),
}));

// Owner store
interface OwnerStore {
  drivers: Driver[];
  rides: Ride[];
  analytics: any;
  setDrivers: (d: Driver[]) => void;
  setRides: (r: Ride[]) => void;
  setAnalytics: (a: any) => void;
}

export const useOwnerStore = create<OwnerStore>((set) => ({
  drivers: [],
  rides: [],
  analytics: null,
  setDrivers: (drivers) => set({ drivers }),
  setRides: (rides) => set({ rides }),
  setAnalytics: (analytics) => set({ analytics }),
}));
