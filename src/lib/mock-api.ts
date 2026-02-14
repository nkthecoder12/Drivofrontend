// Mock API service for development when backend is not available
import { User } from '@/types';

interface MockUser extends User {
  password: string;
  updatedAt: string;
}

// Mock storage
let mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'USER',
    avatar: '',
    password: 'password123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let mockToken = 'mock-jwt-token';

export const mockAuthApi = {
  login: async (email: string, password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw {
        response: {
          status: 401,
          data: { message: 'Invalid email or password' }
        }
      };
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      data: {
        success: true,
        data: {
          token: mockToken,
          user: userWithoutPassword
        }
      }
    };
  },

  signup: async (data: { name: string; email: string; phone: string; password: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    
    if (existingUser) {
      throw {
        response: {
          status: 409,
          data: { message: 'An account with this email already exists' }
        }
      };
    }
    
    // Create new user
    const newUser: MockUser = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'USER', // Default role
      avatar: '',
      password: data.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      data: {
        success: true,
        data: {
          token: mockToken + '-' + Date.now(),
          user: userWithoutPassword
        }
      }
    };
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) {
      throw {
        response: {
          status: 401,
          data: { message: 'Not authenticated' }
        }
      };
    }
    
    const user = JSON.parse(userStr);
    
    return {
      data: {
        success: true,
        data: { user }
      }
    };
  }
};
