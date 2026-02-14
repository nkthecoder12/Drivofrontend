import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Car, DollarSign, Star } from 'lucide-react';

const ridesByDay = [
  { name: 'Mon', rides: 42 }, { name: 'Tue', rides: 58 }, { name: 'Wed', rides: 51 },
  { name: 'Thu', rides: 64 }, { name: 'Fri', rides: 78 }, { name: 'Sat', rides: 89 }, { name: 'Sun', rides: 55 },
];

const rideStatus = [
  { name: 'Completed', value: 1208, color: 'hsl(152, 69%, 42%)' },
  { name: 'Cancelled', value: 76, color: 'hsl(0, 72%, 51%)' },
];

const revenueData = [
  { month: 'Sep', rev: 16200 }, { month: 'Oct', rev: 19400 }, { month: 'Nov', rev: 22100 },
  { month: 'Dec', rev: 20800 }, { month: 'Jan', rev: 23500 }, { month: 'Feb', rev: 24580 },
];

const topDrivers = [
  { name: 'Alex Johnson', rides: 524, rating: 4.9, earnings: '$4,280' },
  { name: 'Maria Garcia', rides: 312, rating: 4.8, earnings: '$2,850' },
  { name: 'James Smith', rides: 198, rating: 4.7, earnings: '$1,920' },
];

const OwnerAnalytics: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Detailed performance metrics</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rides per day */}
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold">Rides Per Day</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ridesByDay}>
              <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }} />
              <Bar dataKey="rides" fill="hsl(152, 69%, 42%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion rate */}
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold">Ride Completion</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={rideStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {rideStatus.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-center gap-6">
            {rideStatus.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span>{s.name}: {s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue trend */}
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <defs>
                <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 69%, 42%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(152, 69%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="rev" stroke="hsl(152, 69%, 42%)" strokeWidth={2} fill="url(#analyticsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top drivers */}
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold">Top Drivers</h3>
          <div className="space-y-3">
            {topDrivers.map((driver, i) => (
              <div key={driver.name} className="flex items-center gap-3 rounded-xl bg-secondary/30 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{driver.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{driver.rides} rides</span>
                    <span>•</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {driver.rating}
                    </div>
                  </div>
                </div>
                <span className="font-display font-bold text-accent">{driver.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerAnalytics;
