import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useAuthNavigation } from '@/lib/use-auth-navigation';
import { Car, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignupPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { navigateAfterAuth } = useAuthNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await signup(form);
      // Success - navigate based on user role
      navigateAfterAuth(user.role);
    } catch (err: any) {
      console.error('Signup error:', err);
      // More detailed error handling
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check your internet connection.');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Invalid information provided.');
      } else if (err.response?.status === 409) {
        setError('An account with this email already exists.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err?.response?.data?.message || 'Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Car className="h-6 w-6 text-accent-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-primary-foreground">RideFleet</span>
        </div>
        <div className="space-y-6">
          <h1 className="font-display text-5xl font-bold leading-tight text-primary-foreground">
            Start your<br />
            <span className="text-accent">journey.</span>
          </h1>
          <p className="max-w-md text-lg text-primary-foreground/70">
            Create an account and book your first ride in seconds.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/40">© 2026 RideFleet. All rights reserved.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">RideFleet</span>
          </div>

          <h2 className="font-display text-2xl font-bold">Create account</h2>
          <p className="mb-8 mt-2 text-sm text-muted-foreground">Join RideFleet and start riding</p>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-scale-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input type="text" placeholder="John Doe" value={form.name} onChange={update('name')} required className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} required className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input type="tel" placeholder="+1 234 567 890" value={form.phone} onChange={update('phone')} required className="h-12 rounded-xl bg-secondary/50 border-0 focus-visible:ring-accent" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={update('password')} required className="h-12 rounded-xl bg-secondary/50 border-0 pr-12 focus-visible:ring-accent" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-accent text-accent-foreground font-semibold text-base hover:bg-accent/90 transition-all">
              {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" /> : <>Create Account<ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
