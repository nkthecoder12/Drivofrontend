import React, { useState, useEffect } from 'react';
import { Power, MapPin, Navigation, Phone, Clock, CheckCircle2, Car, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapView from '@/components/shared/MapView';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useDriverStore } from '@/stores';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Ride } from '@/types';

const mockIncomingRide: Ride = {
  id: 'ride_demo',
  userId: 'user1',
  status: 'ASSIGNED',
  pickup: { address: '123 Main Street, Downtown', coordinates: { lat: 40.73, lng: -73.99 } },
  dropoff: { address: 'Airport Terminal 2', coordinates: { lat: 40.64, lng: -73.78 } },
  fare: { baseFare: 3, distanceFare: 15, timeFare: 4, totalFare: 22, currency: 'USD', estimatedTime: 25, estimatedDistance: 18 },
  createdAt: new Date().toISOString(),
};

const DriverDashboard: React.FC = () => {
  const { status, setStatus, currentRide, setCurrentRide } = useDriverStore();
  const { user, logout } = useAuth();
  const [showIncoming, setShowIncoming] = useState(false);

  const toggleOnline = () => {
    const newStatus = status === 'OFFLINE' ? 'ONLINE' : 'OFFLINE';
    setStatus(newStatus);
    if (newStatus === 'OFFLINE') {
      setCurrentRide(null);
      setShowIncoming(false);
    }
  };

  // Demo: show incoming ride after going online
  useEffect(() => {
    if (status === 'ONLINE' && !currentRide) {
      const timer = setTimeout(() => setShowIncoming(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, currentRide]);

  const acceptRide = () => {
    setCurrentRide(mockIncomingRide);
    setStatus('ON_RIDE');
    setShowIncoming(false);
  };

  const advanceRide = () => {
    if (!currentRide) return;
    if (currentRide.status === 'ASSIGNED') {
      setCurrentRide({ ...currentRide, status: 'DRIVER_ARRIVING' });
    } else if (currentRide.status === 'DRIVER_ARRIVING') {
      setCurrentRide({ ...currentRide, status: 'STARTED' });
    } else if (currentRide.status === 'STARTED') {
      setCurrentRide({ ...currentRide, status: 'COMPLETED' });
      setTimeout(() => { setCurrentRide(null); setStatus('ONLINE'); }, 2000);
    }
  };

  const getActionLabel = () => {
    if (!currentRide) return '';
    switch (currentRide.status) {
      case 'ASSIGNED': return 'Arrived at Pickup';
      case 'DRIVER_ARRIVING': return 'Start Ride';
      case 'STARTED': return 'Complete Ride';
      default: return '';
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Map */}
      <div className="relative flex-1">
        <MapView
          className="h-full"
          pickup={currentRide?.pickup.coordinates}
          dropoff={currentRide?.dropoff.coordinates}
          driverLocation={{ lat: 40.735, lng: -73.985 }}
          showRoute={!!currentRide}
        />

        {/* Header */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-2 shadow-card">
            <div className={cn(
              'h-3 w-3 rounded-full',
              status === 'ONLINE' ? 'bg-accent animate-pulse-soft' : status === 'ON_RIDE' ? 'bg-info' : 'bg-muted-foreground'
            )} />
            <span className="text-sm font-semibold">{status === 'ON_RIDE' ? 'On Ride' : status === 'ONLINE' ? 'Online' : 'Offline'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={logout} className="rounded-full bg-card p-2 shadow-card">
              <span className="text-xs font-bold text-muted-foreground">{user?.name?.charAt(0)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom panel */}
      <div className="rounded-t-3xl bg-card shadow-float">
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />

        <div className="p-5">
          {/* No ride - online/offline toggle */}
          {!currentRide && !showIncoming && (
            <div className="text-center">
              <button
                onClick={toggleOnline}
                className={cn(
                  'mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300',
                  status === 'ONLINE'
                    ? 'bg-accent text-accent-foreground shadow-lg ring-4 ring-accent/20'
                    : 'bg-secondary text-muted-foreground shadow-card hover:bg-primary hover:text-primary-foreground'
                )}
              >
                <Power className="h-8 w-8" />
              </button>
              <p className="mt-4 font-display text-lg font-bold">
                {status === 'ONLINE' ? 'You\'re Online' : 'Go Online'}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {status === 'ONLINE' ? 'Waiting for ride requests...' : 'Tap to start accepting rides'}
              </p>
            </div>
          )}

          {/* Incoming ride notification */}
          {showIncoming && !currentRide && (
            <div className="animate-scale-in">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning animate-pulse-soft" />
                <p className="font-display text-lg font-bold">New Ride Request</p>
              </div>

              <div className="mb-4 rounded-xl bg-secondary/50 p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex flex-col items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                    <div className="h-6 w-px bg-border" />
                    <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-sm font-medium">{mockIncomingRide.pickup.address}</p>
                    <p className="text-sm font-medium">{mockIncomingRide.dropoff.address}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-around rounded-xl bg-accent/10 p-3">
                <div className="text-center">
                  <p className="font-display text-xl font-bold text-accent">${mockIncomingRide.fare?.totalFare}</p>
                  <p className="text-xs text-muted-foreground">Fare</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="font-display text-xl font-bold">{mockIncomingRide.fare?.estimatedDistance} km</p>
                  <p className="text-xs text-muted-foreground">Distance</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <p className="font-display text-xl font-bold">{mockIncomingRide.fare?.estimatedTime} min</p>
                  <p className="text-xs text-muted-foreground">Time</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowIncoming(false)}
                  className="flex-1 h-14 rounded-2xl"
                >
                  Decline
                </Button>
                <Button
                  onClick={acceptRide}
                  className="flex-1 h-14 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Accept
                </Button>
              </div>
            </div>
          )}

          {/* Active ride */}
          {currentRide && (
            <div className="animate-fade-in">
              <div className="mb-3 flex items-center justify-between">
                <StatusBadge status={currentRide.status} />
                <span className="font-display text-lg font-bold">${currentRide.fare?.totalFare}</span>
              </div>

              {/* Rider info */}
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  J
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">John Rider</p>
                  <p className="text-xs text-muted-foreground">
                    {currentRide.status === 'STARTED' ? currentRide.dropoff.address : currentRide.pickup.address}
                  </p>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Phone className="h-4 w-4" />
                </button>
              </div>

              {/* Action button */}
              {currentRide.status !== 'COMPLETED' && (
                <Button
                  onClick={advanceRide}
                  className={cn(
                    'h-14 w-full rounded-2xl font-semibold text-base',
                    currentRide.status === 'STARTED'
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  {currentRide.status === 'STARTED' && <CheckCircle2 className="mr-2 h-5 w-5" />}
                  {currentRide.status === 'ASSIGNED' && <Navigation className="mr-2 h-5 w-5" />}
                  {currentRide.status === 'DRIVER_ARRIVING' && <Car className="mr-2 h-5 w-5" />}
                  {getActionLabel()}
                </Button>
              )}

              {currentRide.status === 'COMPLETED' && (
                <div className="rounded-2xl bg-accent/10 p-6 text-center animate-scale-in">
                  <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-accent" />
                  <p className="font-display text-lg font-bold">Ride Complete!</p>
                  <p className="text-sm text-muted-foreground">Earnings added to your balance</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
