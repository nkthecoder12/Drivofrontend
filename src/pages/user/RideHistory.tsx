import React from 'react';
import { MapPin, Clock, Star, ChevronRight, Navigation } from 'lucide-react';
import { StatusBadge, EmptyState } from '@/components/shared/StatusBadge';
import { Ride, RideStatus } from '@/types';

const mockHistory: Ride[] = [
  {
    id: '1', userId: '', status: 'COMPLETED',
    pickup: { address: '123 Main St', coordinates: { lat: 0, lng: 0 } },
    dropoff: { address: 'Airport Terminal 2', coordinates: { lat: 0, lng: 0 } },
    finalFare: 24.50, rating: 5,
    createdAt: '2026-02-14T10:30:00Z', completedAt: '2026-02-14T11:05:00Z',
  },
  {
    id: '2', userId: '', status: 'COMPLETED',
    pickup: { address: 'Office Park', coordinates: { lat: 0, lng: 0 } },
    dropoff: { address: 'Downtown Mall', coordinates: { lat: 0, lng: 0 } },
    finalFare: 12.00, rating: 4,
    createdAt: '2026-02-13T18:00:00Z', completedAt: '2026-02-13T18:22:00Z',
  },
  {
    id: '3', userId: '', status: 'CANCELLED',
    pickup: { address: 'Home', coordinates: { lat: 0, lng: 0 } },
    dropoff: { address: 'Gym', coordinates: { lat: 0, lng: 0 } },
    createdAt: '2026-02-12T07:00:00Z', cancelledAt: '2026-02-12T07:05:00Z',
  },
];

const RideHistory: React.FC = () => {
  return (
    <div className="px-5 py-6">
      <h1 className="mb-6 font-display text-2xl font-bold">Ride History</h1>

      {mockHistory.length === 0 ? (
        <EmptyState icon={<Clock className="h-8 w-8" />} title="No rides yet" description="Your ride history will appear here" />
      ) : (
        <div className="space-y-3">
          {mockHistory.map((ride) => (
            <button
              key={ride.id}
              className="w-full rounded-2xl bg-card p-4 shadow-card text-left transition-all hover:shadow-elevated active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-3">
                <StatusBadge status={ride.status} />
                {ride.finalFare && (
                  <span className="font-display text-lg font-bold">${ride.finalFare.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 flex flex-col items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="h-6 w-px bg-border" />
                  <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm font-medium">{ride.pickup.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{ride.dropoff.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
                <span className="text-xs text-muted-foreground">
                  {new Date(ride.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
                {ride.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: ride.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;
