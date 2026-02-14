import React from 'react';
import { RideStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig: Record<RideStatus, { label: string; variant: string }> = {
  PENDING: { label: 'Finding Driver', variant: 'bg-warning/10 text-warning border-warning/20' },
  ASSIGNED: { label: 'Driver Assigned', variant: 'bg-info/10 text-info border-info/20' },
  DRIVER_ARRIVING: { label: 'Arriving', variant: 'bg-info/10 text-info border-info/20' },
  STARTED: { label: 'In Progress', variant: 'bg-accent/10 text-accent border-accent/20' },
  COMPLETED: { label: 'Completed', variant: 'bg-success/10 text-success border-success/20' },
  CANCELLED: { label: 'Cancelled', variant: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export const StatusBadge: React.FC<{ status: RideStatus; className?: string }> = ({ status, className }) => {
  const config = statusConfig[status];
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', config.variant, className)}>
      {config.label}
    </span>
  );
};

export const LoadingScreen: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-2 border-muted" />
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
    </div>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

export const EmptyState: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="mb-4 rounded-2xl bg-muted p-4 text-muted-foreground">{icon}</div>
    <h3 className="mb-1 font-display text-lg font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
