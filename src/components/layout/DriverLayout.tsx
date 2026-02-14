import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Car, Clock, DollarSign, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

const driverTabs = [
  { path: '/driver', icon: Car, label: 'Dashboard' },
  { path: '/driver/history', icon: Clock, label: 'History' },
  { path: '/driver/earnings', icon: DollarSign, label: 'Earnings' },
];

const DriverLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      <nav className="glass border-t safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {driverTabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 transition-all duration-200',
                  isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <tab.icon className={cn('h-5 w-5', isActive && 'scale-110')} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default DriverLayout;
