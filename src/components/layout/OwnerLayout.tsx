import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { LayoutDashboard, Users, Car, BarChart3, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { path: '/owner', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/owner/drivers', icon: Users, label: 'Drivers' },
  { path: '/owner/rides', icon: Car, label: 'Rides' },
  { path: '/owner/analytics', icon: BarChart3, label: 'Analytics' },
];

const OwnerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-sm font-bold">RideFleet</h1>
            <p className="text-[11px] text-muted-foreground">Fleet Manager</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t p-3">
          <div className="mb-3 flex items-center gap-3 px-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
              {user?.name?.charAt(0) || 'O'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{user?.name || 'Owner'}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b bg-card px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Car className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-bold">RideFleet</span>
          </div>
          <button onClick={logout} className="text-muted-foreground">
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="flex items-center justify-around border-t bg-card py-2 lg:hidden">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1',
                  isActive ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default OwnerLayout;
