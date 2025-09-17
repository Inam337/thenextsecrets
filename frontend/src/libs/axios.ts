// lib/axios.ts
import axios from 'axios';

const api = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10)
});

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const { data } = await api.post('/auth/refresh');
      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      original.headers['Authorization'] = `Bearer ${data.accessToken}`;
      return api(original);
    }
    return Promise.reject(err);
  }
);
export function setAccessToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;

