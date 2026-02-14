import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';

export const useAuthNavigation = () => {
  const navigate = useNavigate();

  const navigateAfterAuth = (userRole: UserRole) => {
    switch (userRole) {
      case 'DRIVER':
        navigate('/driver');
        break;
      case 'OWNER':
        navigate('/owner');
        break;
      case 'USER':
      default:
        navigate('/ride');
        break;
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return {
    navigateAfterAuth,
    navigateToLogin,
  };
};
