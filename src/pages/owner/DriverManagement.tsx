import React, { useState } from 'react';
import { Plus, Search, MoreVertical, UserCheck, UserX, Trash2, X, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Driver } from '@/types';
import { cn } from '@/lib/utils';

const mockDrivers: Driver[] = [
  { id: '1', userId: 'u1', name: 'Alex Johnson', email: 'alex@ridefleet.com', phone: '+1234567890', status: 'ONLINE', vehicleNumber: 'AB 1234', vehicleModel: 'Toyota Camry', rating: 4.9, totalRides: 524, isActive: true, ownerId: 'o1', createdAt: '2025-06-01' },
  { id: '2', userId: 'u2', name: 'Maria Garcia', email: 'maria@ridefleet.com', phone: '+1234567891', status: 'ON_RIDE', vehicleNumber: 'CD 5678', vehicleModel: 'Honda Civic', rating: 4.8, totalRides: 312, isActive: true, ownerId: 'o1', createdAt: '2025-08-15' },
  { id: '3', userId: 'u3', name: 'James Smith', email: 'james@ridefleet.com', phone: '+1234567892', status: 'OFFLINE', vehicleNumber: 'EF 9012', vehicleModel: 'Hyundai Sonata', rating: 4.7, totalRides: 198, isActive: true, ownerId: 'o1', createdAt: '2025-10-20' },
  { id: '4', userId: 'u4', name: 'Sarah Wilson', email: 'sarah@ridefleet.com', phone: '+1234567893', status: 'OFFLINE', vehicleNumber: 'GH 3456', vehicleModel: 'Kia Optima', rating: 4.6, totalRides: 87, isActive: false, ownerId: 'o1', createdAt: '2025-12-01' },
];

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newDriver, setNewDriver] = useState({ name: '', email: '', phone: '', vehicleNumber: '', vehicleModel: '', password: '' });

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setDrivers(ds => ds.map(d => d.id === id ? { ...d, isActive: !d.isActive } : d));
  };

  const handleCreate = () => {
    const driver: Driver = {
      id: Date.now().toString(),
      userId: '',
      ...newDriver,
      status: 'OFFLINE',
      rating: 5,
      totalRides: 0,
      isActive: true,
      ownerId: '',
      createdAt: new Date().toISOString(),
    };
    setDrivers([driver, ...drivers]);
    setNewDriver({ name: '', email: '', phone: '', vehicleNumber: '', vehicleModel: '', password: '' });
    setShowCreate(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Drivers</h1>
          <p className="text-sm text-muted-foreground">{drivers.length} total drivers</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="mb-6 rounded-2xl bg-card p-5 shadow-card animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">New Driver</h3>
            <button onClick={() => setShowCreate(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'john@ridefleet.com' },
              { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 234 567 890' },
              { key: 'vehicleNumber', label: 'Vehicle Number', type: 'text', placeholder: 'AB 1234' },
              { key: 'vehicleModel', label: 'Vehicle Model', type: 'text', placeholder: 'Toyota Camry' },
              { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.key} className="space-y-1">
                <label className="text-xs font-medium">{field.label}</label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={newDriver[field.key as keyof typeof newDriver]}
                  onChange={(e) => setNewDriver({ ...newDriver, [field.key]: e.target.value })}
                  className="h-10 rounded-lg border-0 bg-secondary/50 text-sm focus-visible:ring-accent"
                />
              </div>
            ))}
          </div>
          <Button onClick={handleCreate} className="mt-4 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
            Create Driver
          </Button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search drivers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 rounded-xl border-0 bg-secondary/50 pl-10 focus-visible:ring-accent"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-card shadow-card overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 border-b px-5 py-3 text-xs font-medium text-muted-foreground">
          <span>Driver</span>
          <span>Vehicle</span>
          <span>Status</span>
          <span>Rating</span>
          <span>Actions</span>
        </div>

        {filtered.map((driver) => (
          <div
            key={driver.id}
            className={cn(
              'flex flex-col gap-3 border-b p-4 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_80px] sm:items-center sm:gap-4 sm:px-5 sm:py-3 last:border-0',
              !driver.isActive && 'opacity-50'
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {driver.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{driver.name}</p>
                <p className="text-xs text-muted-foreground">{driver.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:block">
              <Car className="h-3.5 w-3.5 text-muted-foreground sm:hidden" />
              <span className="text-sm">{driver.vehicleModel}</span>
              <span className="text-xs text-muted-foreground">• {driver.vehicleNumber}</span>
            </div>
            <div>
              <span className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
                driver.status === 'ONLINE' ? 'bg-accent/10 text-accent' :
                driver.status === 'ON_RIDE' ? 'bg-info/10 text-info' : 'bg-muted text-muted-foreground'
              )}>
                <span className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  driver.status === 'ONLINE' ? 'bg-accent' :
                  driver.status === 'ON_RIDE' ? 'bg-info' : 'bg-muted-foreground'
                )} />
                {driver.status}
              </span>
            </div>
            <div className="text-sm font-medium">⭐ {driver.rating} <span className="text-xs text-muted-foreground">({driver.totalRides})</span></div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleActive(driver.id)}
                className={cn(
                  'rounded-lg p-2 transition-colors',
                  driver.isActive ? 'text-destructive hover:bg-destructive/10' : 'text-accent hover:bg-accent/10'
                )}
                title={driver.isActive ? 'Deactivate' : 'Activate'}
              >
                {driver.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverManagement;
