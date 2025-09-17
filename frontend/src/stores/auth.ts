import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { setAccessToken } from '@/libs/axios';
import { authService } from '@/services/auth';

type User = {
  fullName: string;
  email: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => void; // to restore accessToken to axios after refresh
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await authService.login(email, password);
          setAccessToken(data.accessToken);
          set({ user: data.user, accessToken: data.accessToken });
        } finally {
          set({ loading: false });
        }
      },

      register: async (fullName, email, password) => {
        set({ loading: true });
        try {
          const { data } = await authService.register(fullName, email, password);
          setAccessToken(data.accessToken);
          set({ user: data.user, accessToken: data.accessToken });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        await authService.logout();
        setAccessToken('');
        set({ user: null, accessToken: null });
      },

      hydrate: () => {
        const token = get().accessToken;
        if (token) setAccessToken(token);
      },
    }),
    {
      name: 'auth-storage', // key in localStorage
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
