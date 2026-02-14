import React from 'react';
import { Car, Users, DollarSign, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

const stats = [
  { label: 'Total Rides', value: '1,284', change: '+12%', icon: Car, color: 'bg-accent/10 text-accent' },
  { label: 'Active Drivers', value: '18', change: '+3', icon: Users, color: 'bg-info/10 text-info' },
  { label: 'Revenue', value: '$24,580', change: '+8%', icon: DollarSign, color: 'bg-success/10 text-success' },
  { label: 'Completion Rate', value: '94.2%', change: '+1.2%', icon: Activity, color: 'bg-warning/10 text-warning' },
];

const weeklyRides = [
  { name: 'Mon', rides: 42 },
  { name: 'Tue', rides: 58 },
  { name: 'Wed', rides: 51 },
  { name: 'Thu', rides: 64 },
  { name: 'Fri', rides: 78 },
  { name: 'Sat', rides: 89 },
  { name: 'Sun', rides: 55 },
];

const monthlyRevenue = [
  { name: 'Jan', amount: 18200 },
  { name: 'Feb', amount: 24580 },
  { name: 'Mar', amount: 21300 },
  { name: 'Apr', amount: 26800 },
  { name: 'May', amount: 29100 },
  { name: 'Jun', amount: 31500 },
];

const OwnerDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Fleet performance overview</p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-accent">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold">Rides This Week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyRides}>
              <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }}
              />
              <Bar dataKey="rides" fill="hsl(152, 69%, 42%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue}>
              <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 12 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 69%, 42%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(152, 69%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="amount" stroke="hsl(152, 69%, 42%)" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
