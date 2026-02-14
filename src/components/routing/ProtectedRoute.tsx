import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    const redirectMap: Record<UserRole, string> = {
      USER: '/ride',
      DRIVER: '/driver',
      OWNER: '/owner',
    };
    return <Navigate to={redirectMap[user.role] || '/login'} replace />;
  }

  return <Outlet />;
};

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    const redirectMap: Record<UserRole, string> = {
      USER: '/ride',
      DRIVER: '/driver',
      OWNER: '/owner',
    };
    return <Navigate to={redirectMap[user.role]} replace />;
  }

  return <Outlet />;
};
