import api from '@/libs/axios';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      return {
        data: {
          user: {
            id: response.data.data.user?.id || '1',
            fullName: response.data.data.user?.name || email.split('@')[0],
            email: email,
          },
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        },
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Login failed. Please try again.');
    }
  },

  register: async (fullName: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { 
        name: fullName, 
        email, 
        password 
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }

      return {
        data: {
          user: {
            id: response.data.user.id,
            fullName: response.data.user.name,
            email: response.data.user.email,
          },
          accessToken: null, // Registration doesn't return token, user needs to login
        },
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Registration failed. Please try again.');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
      return {
        data: {
          message: 'Logged out successfully',
        },
      };
    } catch (error) {
      // Even if logout fails on server, clear local state
      return {
        data: {
          message: 'Logged out successfully',
        },
      };
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await api.post('/auth/refresh', { token: refreshToken });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Token refresh failed');
      }

      return {
        data: {
          accessToken: response.data.data.accessToken,
        },
      };
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Token refresh failed');
    }
  },

  me: async () => {
    try {
      const response = await api.get('/users/me');
      return {
        data: {
          user: {
            id: response.data.id,
            fullName: response.data.name,
            email: response.data.email,
          },
        },
      };
    } catch (error) {
      throw new Error('Failed to get user information');
    }
  },
};
