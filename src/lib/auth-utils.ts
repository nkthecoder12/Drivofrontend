import { UserRole } from '@/types';

export const requireRole = (userRole: UserRole | undefined, allowedRoles: UserRole[]): boolean => {
  return userRole ? allowedRoles.includes(userRole) : false;
};
