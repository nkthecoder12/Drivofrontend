import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Ride, RideStatus } from '@/types';
import { cn } from '@/lib/utils';

const mockRides: Ride[] = [
  { id: '1', userId: 'u1', driverId: 'd1', status: 'STARTED', pickup: { address: 'Central Park', coordinates: { lat: 0, lng: 0 } }, dropoff: { address: 'Times Square', coordinates: { lat: 0, lng: 0 } }, fare: { baseFare: 3, distanceFare: 8, timeFare: 3, totalFare: 14, currency: 'USD', estimatedTime: 15, estimatedDistance: 6 }, createdAt: '2026-02-14T14:30:00Z' },
  { id: '2', userId: 'u2', driverId: 'd2', status: 'ASSIGNED', pickup: { address: 'Broadway', coordinates: { lat: 0, lng: 0 } }, dropoff: { address: 'Wall Street', coordinates: { lat: 0, lng: 0 } }, fare: { baseFare: 3, distanceFare: 12, timeFare: 5, totalFare: 20, currency: 'USD', estimatedTime: 22, estimatedDistance: 10 }, createdAt: '2026-02-14T14:25:00Z' },
  { id: '3', userId: 'u3', status: 'PENDING', pickup: { address: 'Union Square', coordinates: { lat: 0, lng: 0 } }, dropoff: { address: 'Brooklyn Bridge', coordinates: { lat: 0, lng: 0 } }, createdAt: '2026-02-14T14:20:00Z' },
  { id: '4', userId: 'u4', driverId: 'd3', status: 'COMPLETED', pickup: { address: 'SoHo', coordinates: { lat: 0, lng: 0 } }, dropoff: { address: 'Chinatown', coordinates: { lat: 0, lng: 0 } }, finalFare: 9.50, createdAt: '2026-02-14T13:00:00Z', completedAt: '2026-02-14T13:15:00Z' },
  { id: '5', userId: 'u5', status: 'CANCELLED', pickup: { address: 'Harlem', coordinates: { lat: 0, lng: 0 } }, dropoff: { address: 'Midtown', coordinates: { lat: 0, lng: 0 } }, createdAt: '2026-02-14T12:30:00Z', cancelledAt: '2026-02-14T12:35:00Z' },
];

const filters: { label: string; value: RideStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Active', value: 'STARTED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

const RideMonitor: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<RideStatus | 'ALL'>('ALL');

  const filtered = mockRides.filter(r => {
    if (activeFilter !== 'ALL' && r.status !== activeFilter) return false;
    if (search && !r.pickup.address.toLowerCase().includes(search.toLowerCase()) && !r.dropoff.address.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Ride Monitor</h1>
        <p className="text-sm text-muted-foreground">Live ride tracking</p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              activeFilter === f.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 rounded-xl border-0 bg-secondary/50 pl-10 focus-visible:ring-accent"
        />
      </div>

      {/* Rides list */}
      <div className="space-y-3">
        {filtered.map((ride) => (
          <div key={ride.id} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <StatusBadge status={ride.status} />
                <span className="text-xs text-muted-foreground">#{ride.id}</span>
              </div>
              {(ride.fare?.totalFare || ride.finalFare) && (
                <span className="font-display font-bold">${(ride.finalFare || ride.fare?.totalFare || 0).toFixed(2)}</span>
              )}
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex flex-col items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="h-6 w-px bg-border" />
                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm">{ride.pickup.address}</p>
                <p className="text-sm">{ride.dropoff.address}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
              <span>{new Date(ride.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              {ride.driverId && <span>Driver assigned</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideMonitor;
