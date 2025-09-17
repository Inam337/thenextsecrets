'use client';

import { useAuthStore } from '@/stores/auth';
import { useEffect } from 'react';

export default function HomePage() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to NextAuth App
        </h1>
        <p className="text-lg text-gray-600">
          Please login to access the dashboard
        </p>
      </div>
    </div>
  );
}