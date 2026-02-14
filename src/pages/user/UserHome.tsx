import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, ChevronRight, Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MapView from '@/components/shared/MapView';
import { useRideStore } from '@/stores';
import { useAuth } from '@/lib/auth';

const recentLocations = [
  { id: '1', name: 'Central Business District', address: '123 Main St, Downtown', lat: 40.7128, lng: -74.006 },
  { id: '2', name: 'Airport Terminal 2', address: 'International Airport', lat: 40.6413, lng: -73.7781 },
  { id: '3', name: 'Shopping Mall', address: '456 Commerce Ave', lat: 40.7282, lng: -73.7949 },
];

const UserHome: React.FC = () => {
  const [pickupText, setPickupText] = useState('');
  const [dropoffText, setDropoffText] = useState('');
  const { setPickup, setDropoff } = useRideStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSelectRecent = (loc: typeof recentLocations[0]) => {
    setDropoff({ address: loc.address, coordinates: { lat: loc.lat, lng: loc.lng } });
    setDropoffText(loc.name);
  };

  const handleBookRide = () => {
    if (pickupText && dropoffText) {
      setPickup({ address: pickupText, coordinates: { lat: 40.73, lng: -73.99 } });
      navigate('/ride/booking');
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      {/* Map background */}
      <MapView
        className="absolute inset-0"
        interactive
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-elevated">
            <span className="text-sm font-bold text-primary-foreground">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Good evening</p>
            <p className="text-sm font-semibold">{user?.name?.split(' ')[0] || 'Rider'}</p>
          </div>
        </div>
        <button onClick={logout} className="rounded-full bg-card p-2 shadow-card">
          <Shield className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Bottom sheet */}
      <div className="relative z-10 mt-auto">
        <div className="rounded-t-3xl bg-card shadow-float animate-slide-up">
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />

          <div className="p-5">
            <h2 className="mb-4 font-display text-lg font-bold">Where to?</h2>

            {/* Location inputs */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20" />
                </div>
                <Input
                  placeholder="Pickup location"
                  value={pickupText}
                  onChange={(e) => setPickupText(e.target.value)}
                  className="h-12 rounded-xl border-0 bg-secondary/70 pl-12 text-sm focus-visible:ring-accent"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 rounded-sm bg-primary" />
                </div>
                <Input
                  placeholder="Where are you going?"
                  value={dropoffText}
                  onChange={(e) => setDropoffText(e.target.value)}
                  className="h-12 rounded-xl border-0 bg-secondary/70 pl-12 text-sm focus-visible:ring-accent"
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-4 flex gap-2">
              {[
                { icon: Star, label: 'Saved' },
                { icon: Clock, label: 'Recent' },
                { icon: MapPin, label: 'Set on map' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <action.icon className="h-3.5 w-3.5" />
                  {action.label}
                </button>
              ))}
            </div>

            {/* Recent locations */}
            <div className="mt-5 space-y-1">
              {recentLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleSelectRecent(loc)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-secondary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{loc.name}</p>
                    <p className="text-xs text-muted-foreground">{loc.address}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* Book button */}
            <Button
              onClick={handleBookRide}
              disabled={!pickupText || !dropoffText}
              className="mt-4 h-14 w-full rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-elevated hover:bg-primary/90 transition-all disabled:opacity-40"
            >
              <Search className="mr-2 h-5 w-5" />
              Find a ride
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
