import api from '@/libs/axios';

// Mock user data
const mockUsers = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456',
  },
];

// Mock API responses with delays to simulate real API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generateToken = (userId: string) => {
  return `mock_token_${userId}_${Date.now()}`;
};

export const authService = {
  login: async (email: string, password: string) => {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id);
    
    return {
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
        accessToken: token,
      },
    };
  },

  register: async (fullName: string, email: string, password: string) => {
    await delay(1200); // Simulate network delay
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      fullName,
      email,
      password,
    };
    
    mockUsers.push(newUser);
    const token = generateToken(newUser.id);
    
    return {
      data: {
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
        accessToken: token,
      },
    };
  },

  logout: async () => {
    await delay(500); // Simulate network delay
    
    return {
      data: {
        message: 'Logged out successfully',
      },
    };
  },

  me: async () => {
    await delay(800); // Simulate network delay
    
    // In a real app, this would validate the token and return user data
    // For mock purposes, return the first user
    const user = mockUsers[0];
    
    return {
      data: {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        },
      },
    };
  },
};
