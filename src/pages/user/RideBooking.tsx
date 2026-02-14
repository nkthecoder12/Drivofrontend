import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Navigation, Zap, Car, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapView from '@/components/shared/MapView';
import { useRideStore } from '@/stores';
import { cn } from '@/lib/utils';

const rideTypes = [
  { id: 'economy', name: 'Economy', icon: Car, time: '4 min', price: '$8.50', multiplier: 1 },
  { id: 'comfort', name: 'Comfort', icon: Car, time: '6 min', price: '$12.00', multiplier: 1.4 },
  { id: 'pool', name: 'Pool', icon: Users, time: '8 min', price: '$5.50', multiplier: 0.65 },
  { id: 'premium', name: 'Premium', icon: Zap, time: '3 min', price: '$18.00', multiplier: 2.1 },
];

const RideBooking: React.FC = () => {
  const [selectedType, setSelectedType] = useState('economy');
  const [confirming, setConfirming] = useState(false);
  const { pickup, dropoff, setCurrentRide } = useRideStore();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setConfirming(true);
    // In production, call rideApi.createRide
    setTimeout(() => {
      setCurrentRide({
        id: 'ride_' + Date.now(),
        userId: '',
        pickup: pickup || { address: 'Current Location', coordinates: { lat: 40.73, lng: -73.99 } },
        dropoff: dropoff || { address: 'Destination', coordinates: { lat: 40.75, lng: -73.98 } },
        status: 'PENDING',
        fare: { baseFare: 3, distanceFare: 4.5, timeFare: 1, totalFare: 8.5, currency: 'USD', estimatedTime: 12, estimatedDistance: 5.2 },
        createdAt: new Date().toISOString(),
      });
      navigate('/ride/tracking');
    }, 1500);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Map */}
      <div className="relative flex-1">
        <MapView
          className="h-full"
          pickup={pickup?.coordinates || { lat: 40.73, lng: -73.99 }}
          dropoff={dropoff?.coordinates || { lat: 40.75, lng: -73.98 }}
          showRoute
        />
        <button
          onClick={() => navigate('/ride')}
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Route info pill */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-card">
          <Clock className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold">12 min</span>
          <span className="text-xs text-muted-foreground">• 5.2 km</span>
        </div>
      </div>

      {/* Bottom panel */}
      <div className="rounded-t-3xl bg-card shadow-float animate-slide-up">
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />

        <div className="p-5">
          {/* Location summary */}
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
            <div className="flex flex-col items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <div className="h-6 w-px bg-border" />
              <div className="h-3 w-3 rounded-sm bg-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="text-sm font-medium">{pickup?.address || 'Current Location'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Dropoff</p>
                <p className="text-sm font-medium">{dropoff?.address || 'Destination'}</p>
              </div>
            </div>
          </div>

          {/* Ride type selection */}
          <div className="space-y-2">
            {rideTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-all',
                  selectedType === type.id
                    ? 'border-accent bg-accent/5'
                    : 'border-transparent hover:bg-secondary/50'
                )}
              >
                <div className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-xl',
                  selectedType === type.id ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                )}>
                  <type.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold">{type.name}</p>
                  <p className="text-xs text-muted-foreground">{type.time} away</p>
                </div>
                <p className="font-display text-base font-bold">{type.price}</p>
              </button>
            ))}
          </div>

          {/* Confirm button */}
          <Button
            onClick={handleConfirm}
            disabled={confirming}
            className="mt-4 h-14 w-full rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated hover:bg-primary/90"
          >
            {confirming ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Finding your driver...
              </div>
            ) : (
              `Confirm ${rideTypes.find(t => t.id === selectedType)?.name}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideBooking;
