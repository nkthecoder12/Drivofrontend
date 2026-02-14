import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Camera, ChevronRight, LogOut, Shield, CreditCard, Bell, HelpCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const UserProfile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSave = () => {
    updateUser({ name, phone });
    setEditing(false);
  };

  const menuItems = [
    { icon: CreditCard, label: 'Payment Methods', subtitle: 'Visa •••• 4242' },
    { icon: Bell, label: 'Notifications', subtitle: 'Push, Email' },
    { icon: Shield, label: 'Safety', subtitle: 'Emergency contacts' },
    { icon: Star, label: 'Rate Us', subtitle: 'Share your feedback' },
    { icon: HelpCircle, label: 'Help & Support', subtitle: 'FAQ, Contact us' },
  ];

  return (
    <div className="px-5 py-6">
      {/* Avatar & name */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated">
            <span className="font-display text-3xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <h2 className="font-display text-xl font-bold">{user?.name || 'User'}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      {/* Edit section */}
      {editing ? (
        <div className="mb-6 space-y-3 rounded-2xl bg-card p-4 shadow-card animate-scale-in">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-xl border-0 bg-secondary/50 focus-visible:ring-accent" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl border-0 bg-secondary/50 focus-visible:ring-accent" />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={() => setEditing(false)} className="flex-1 rounded-xl">Cancel</Button>
            <Button onClick={handleSave} className="flex-1 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">Save</Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="mb-6 w-full rounded-2xl bg-card p-4 shadow-card text-left transition-all hover:shadow-elevated"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Edit Profile</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
      )}

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        onClick={logout}
        className="mt-6 h-12 w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserProfile;
