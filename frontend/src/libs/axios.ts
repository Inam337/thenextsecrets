// lib/axios.ts
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

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

