import React from 'react';
import { DollarSign, TrendingUp, Car, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const earningsData = {
  today: 84.50,
  week: 523.00,
  month: 2145.00,
  total: 12450.00,
  rides: 342,
  currency: 'USD',
};

const weeklyBreakdown = [
  { day: 'Mon', amount: 65 },
  { day: 'Tue', amount: 92 },
  { day: 'Wed', amount: 78 },
  { day: 'Thu', amount: 0 },
  { day: 'Fri', amount: 110 },
  { day: 'Sat', amount: 134 },
  { day: 'Sun', amount: 44 },
];

const maxAmount = Math.max(...weeklyBreakdown.map(d => d.amount));

const DriverEarnings: React.FC = () => {
  return (
    <div className="px-5 py-6">
      <h1 className="mb-6 font-display text-2xl font-bold">Earnings</h1>

      {/* Today's earnings card */}
      <div className="mb-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated">
        <p className="text-sm text-primary-foreground/70">Today's Earnings</p>
        <p className="mt-1 font-display text-4xl font-bold">${earningsData.today.toFixed(2)}</p>
        <div className="mt-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="text-sm text-primary-foreground/70">+12% from yesterday</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: 'This Week', value: `$${earningsData.week}`, icon: Calendar },
          { label: 'This Month', value: `$${earningsData.month}`, icon: DollarSign },
          { label: 'Total Rides', value: earningsData.rides.toString(), icon: Car },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-card p-4 shadow-card text-center">
            <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
            <p className="font-display text-lg font-bold">{stat.value}</p>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <h3 className="mb-4 font-display text-sm font-semibold">This Week</h3>
        <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
          {weeklyBreakdown.map((day) => (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={cn(
                  'w-full rounded-lg transition-all',
                  day.amount > 0 ? 'bg-accent' : 'bg-muted'
                )}
                style={{ height: day.amount > 0 ? `${(day.amount / maxAmount) * 100}%` : 4, minHeight: 4 }}
              />
              <span className="text-[10px] font-medium text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverEarnings;
