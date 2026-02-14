import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, AuthState, UserRole } from '@/types';
import { authApi } from '@/lib/api';
import socketService from '@/lib/socket';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  signup: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ user: User; token: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        setState({ user, token, isAuthenticated: true, isLoading: false });
        socketService.connect(token);
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setState(s => ({ ...s, isLoading: false }));
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const res = await authApi.login(email, password);
    const { token, user } = res.data.data;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    socketService.connect(token);
    setState({ user, token, isAuthenticated: true, isLoading: false });
    // Navigation will be handled by the calling component
    return { user, token };
  }, []);

  const signup = useCallback(async (data: { name: string; email: string; phone: string; password: string }): Promise<{ user: User; token: string }> => {
    const res = await authApi.signup(data);
    const { token, user } = res.data.data;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    socketService.connect(token);
    setState({ user, token, isAuthenticated: true, isLoading: false });
    // Navigation will be handled by the calling component
    return { user, token };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    socketService.disconnect();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    // Navigation will be handled by the calling component
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setState(s => {
      if (!s.user) return s;
      const updated = { ...s.user, ...data };
      localStorage.setItem('auth_user', JSON.stringify(updated));
      return { ...s, user: updated };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
