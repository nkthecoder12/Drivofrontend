import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, X, Star, Navigation, MapPin, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapView from '@/components/shared/MapView';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useRideStore } from '@/stores';
import { RideStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusSteps: { status: RideStatus; label: string; icon: React.ElementType }[] = [
  { status: 'PENDING', label: 'Finding driver', icon: Clock },
  { status: 'ASSIGNED', label: 'Driver assigned', icon: Shield },
  { status: 'DRIVER_ARRIVING', label: 'On the way', icon: Navigation },
  { status: 'STARTED', label: 'Ride in progress', icon: MapPin },
  { status: 'COMPLETED', label: 'Arrived', icon: Star },
];

const RideTracking: React.FC = () => {
  const { currentRide, driverLocation, updateRideStatus, reset } = useRideStore();
  const navigate = useNavigate();
  const [showCancel, setShowCancel] = useState(false);

  // Demo: auto-advance ride status
  useEffect(() => {
    if (!currentRide) return;
    const timers = [
      setTimeout(() => updateRideStatus('ASSIGNED'), 3000),
      setTimeout(() => updateRideStatus('DRIVER_ARRIVING'), 6000),
      setTimeout(() => updateRideStatus('STARTED'), 10000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [currentRide?.id]);

  if (!currentRide) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <div className="rounded-2xl bg-muted p-6">
          <Navigation className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="font-display text-xl font-bold">No active ride</h2>
        <p className="text-center text-sm text-muted-foreground">Book a ride from the home screen to get started</p>
        <Button onClick={() => navigate('/ride')} className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
          Book a Ride
        </Button>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.status === currentRide.status);

  const handleCancel = () => {
    updateRideStatus('CANCELLED');
    setTimeout(() => { reset(); navigate('/ride'); }, 1500);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Map */}
      <div className="relative flex-1">
        <MapView
          className="h-full"
          pickup={currentRide.pickup.coordinates}
          dropoff={currentRide.dropoff.coordinates}
          driverLocation={currentRide.status !== 'PENDING' ? { lat: 40.735, lng: -73.985 } : null}
          showRoute
        />
      </div>

      {/* Bottom panel */}
      <div className="rounded-t-3xl bg-card shadow-float animate-slide-up">
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />

        <div className="p-5">
          {/* Status */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <StatusBadge status={currentRide.status} />
              <p className="mt-1 font-display text-lg font-bold">
                {statusSteps[currentStepIndex]?.label || currentRide.status}
              </p>
            </div>
            {currentRide.fare && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Estimated fare</p>
                <p className="font-display text-xl font-bold">${currentRide.fare.totalFare.toFixed(2)}</p>
              </div>
            )}
          </div>

          {/* Progress steps */}
          <div className="mb-4 flex items-center gap-1">
            {statusSteps.slice(0, -1).map((step, i) => (
              <div
                key={step.status}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all duration-500',
                  i <= currentStepIndex ? 'bg-accent' : 'bg-border'
                )}
              />
            ))}
          </div>

          {/* Driver info (when assigned) */}
          {currentRide.status !== 'PENDING' && (
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-secondary/50 p-3 animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">Toyota Camry • AB 1234</p>
                <div className="mt-0.5 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  <span className="text-xs font-medium">4.9</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MessageCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Cancel button */}
          {currentRide.status !== 'COMPLETED' && currentRide.status !== 'CANCELLED' && (
            <Button
              variant="outline"
              onClick={() => setShowCancel(true)}
              className="h-12 w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel Ride
            </Button>
          )}

          {/* Cancel confirmation */}
          {showCancel && (
            <div className="mt-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 animate-scale-in">
              <p className="mb-3 text-sm font-medium">Are you sure you want to cancel?</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowCancel(false)} className="flex-1 rounded-xl">Keep Ride</Button>
                <Button onClick={handleCancel} className="flex-1 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideTracking;
