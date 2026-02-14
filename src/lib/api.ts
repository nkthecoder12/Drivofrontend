import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { mockAuthApi } from './mock-api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || !import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: USE_MOCK_API 
    ? mockAuthApi.login 
    : (email: string, password: string) => api.post('/auth/login', { email, password }),
    
  signup: USE_MOCK_API 
    ? mockAuthApi.signup 
    : (data: { name: string; email: string; phone: string; password: string }) =>
        api.post('/auth/signup', data),
        
  getProfile: USE_MOCK_API 
    ? mockAuthApi.getProfile 
    : () => api.get('/auth/profile'),
    
  updateProfile: (data: Partial<{ name: string; phone: string; avatar: string }>) =>
    api.put('/auth/profile', data),
};

// Ride API
export const rideApi = {
  estimateFare: (pickup: { lat: number; lng: number }, dropoff: { lat: number; lng: number }) =>
    api.post('/rides/estimate', { pickup, dropoff }),
  createRide: (data: { pickup: any; dropoff: any }) =>
    api.post('/rides', data),
  getRide: (id: string) => api.get(`/rides/${id}`),
  cancelRide: (id: string, reason?: string) =>
    api.post(`/rides/${id}/cancel`, { reason }),
  rateRide: (id: string, rating: number) =>
    api.post(`/rides/${id}/rate`, { rating }),
  getUserRides: (page?: number) =>
    api.get('/rides/history', { params: { page } }),
};

// Driver API
export const driverApi = {
  updateStatus: (status: 'ONLINE' | 'OFFLINE') =>
    api.put('/driver/status', { status }),
  getAssignedRide: () => api.get('/driver/current-ride'),
  acceptRide: (rideId: string) =>
    api.post(`/driver/rides/${rideId}/accept`),
  startRide: (rideId: string) =>
    api.post(`/driver/rides/${rideId}/start`),
  completeRide: (rideId: string) =>
    api.post(`/driver/rides/${rideId}/complete`),
  updateLocation: (lat: number, lng: number) =>
    api.put('/driver/location', { lat, lng }),
  getEarnings: () => api.get('/driver/earnings'),
  getRideHistory: (page?: number) =>
    api.get('/driver/rides', { params: { page } }),
};

// Owner API
export const ownerApi = {
  createDriver: (data: { name: string; email: string; phone: string; vehicleNumber: string; vehicleModel: string; password: string }) =>
    api.post('/owner/drivers', data),
  getDrivers: () => api.get('/owner/drivers'),
  toggleDriverActive: (driverId: string) =>
    api.put(`/owner/drivers/${driverId}/toggle`),
  deleteDriver: (driverId: string) =>
    api.delete(`/owner/drivers/${driverId}`),
  getRides: (params?: { status?: string; page?: number }) =>
    api.get('/owner/rides', { params }),
  getAnalytics: () => api.get('/owner/analytics'),
};

export default api;
