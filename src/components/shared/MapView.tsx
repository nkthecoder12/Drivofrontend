import React from 'react';
import { MapPin, Navigation, Car } from 'lucide-react';
import { LatLng } from '@/types';

interface MapViewProps {
  pickup?: LatLng | null;
  dropoff?: LatLng | null;
  driverLocation?: LatLng | null;
  showRoute?: boolean;
  className?: string;
  interactive?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  pickup,
  dropoff,
  driverLocation,
  showRoute = false,
  className = '',
  interactive = false,
}) => {
  return (
    <div className={`relative overflow-hidden bg-map-bg ${className}`}>
      {/* Map placeholder grid */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-[0.08]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Decorative roads */}
        <svg className="absolute inset-0 w-full h-full text-muted-foreground/10" viewBox="0 0 400 400">
          <path d="M 0 200 Q 100 180 200 200 Q 300 220 400 200" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M 200 0 Q 180 100 200 200 Q 220 300 200 400" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M 50 50 Q 150 100 250 80 Q 350 60 400 100" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M 0 300 Q 100 280 200 320 Q 300 360 350 300" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      {/* Route line */}
      {showRoute && pickup && dropoff && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <path
            d="M 120 280 Q 160 200 200 180 Q 240 160 280 120"
            fill="none"
            stroke="hsl(var(--map-route))"
            strokeWidth="4"
            strokeDasharray="8 4"
            className="animate-pulse-soft"
          />
        </svg>
      )}

      {/* Markers */}
      {pickup && (
        <div className="absolute left-[28%] top-[65%] -translate-x-1/2 -translate-y-full animate-scale-in">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-accent p-2 shadow-lg">
              <MapPin className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="mt-1 h-3 w-0.5 bg-accent" />
            <div className="h-2 w-2 rounded-full bg-accent/40" />
          </div>
        </div>
      )}

      {dropoff && (
        <div className="absolute left-[68%] top-[25%] -translate-x-1/2 -translate-y-full animate-scale-in">
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-destructive p-2 shadow-lg">
              <Navigation className="h-5 w-5 text-destructive-foreground" />
            </div>
            <div className="mt-1 h-3 w-0.5 bg-destructive" />
            <div className="h-2 w-2 rounded-full bg-destructive/40" />
          </div>
        </div>
      )}

      {driverLocation && (
        <div className="absolute left-[45%] top-[45%] -translate-x-1/2 -translate-y-1/2 animate-pulse-soft">
          <div className="rounded-full bg-primary p-2.5 shadow-xl ring-4 ring-primary/20">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      )}

      {/* Interactive overlay */}
      {interactive && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/60 to-transparent p-4">
          <p className="text-center text-sm text-muted-foreground">Tap to set location on map</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
