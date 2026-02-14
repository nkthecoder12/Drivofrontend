import React from 'react';
import { Clock, Star } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Ride } from '@/types';

const mockHistory: Ride[] = [
  {
    id: '1', userId: 'u1', status: 'COMPLETED',
    pickup: { address: '123 Main St', coordinates: { lat: 0, lng: 0 } },
    dropoff: { address: 'Airport', coordinates: { lat: 0, lng: 0 } },
    finalFare: 22.00, rating: 5,
    createdAt: '2026-02-14T08:00:00Z', completedAt: '2026-02-14T08:35:00Z',
  },
  {
    id: '2', userId: 'u2', status: 'COMPLETED',
    pickup: { address: 'Mall Entrance', coordinates: { lat: 0, lng: 0 } },
    dropoff: { address: 'Residential Area', coordinates: { lat: 0, lng: 0 } },
    finalFare: 14.50, rating: 4,
    createdAt: '2026-02-14T10:00:00Z', completedAt: '2026-02-14T10:18:00Z',
  },
  {
    id: '3', userId: 'u3', status: 'CANCELLED',
    pickup: { address: 'Hotel Lobby', coordinates: { lat: 0, lng: 0 } },
    dropoff: { address: 'Convention Center', coordinates: { lat: 0, lng: 0 } },
    createdAt: '2026-02-13T16:00:00Z', cancelledAt: '2026-02-13T16:10:00Z',
  },
];

const DriverHistory: React.FC = () => {
  return (
    <div className="px-5 py-6">
      <h1 className="mb-6 font-display text-2xl font-bold">Ride History</h1>

      <div className="space-y-3">
        {mockHistory.map((ride) => (
          <div key={ride.id} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <StatusBadge status={ride.status} />
              {ride.finalFare && <span className="font-display text-lg font-bold">${ride.finalFare.toFixed(2)}</span>}
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex flex-col items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="h-6 w-px bg-border" />
                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm font-medium">{ride.pickup.address}</p>
                <p className="text-sm font-medium">{ride.dropoff.address}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverHistory;
