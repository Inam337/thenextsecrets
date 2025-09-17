'use client';

import React from 'react';

import { cn } from '@/libs/utils';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {


  return (
    <div
      className={cn(
        'w-full bg-white overflow-hidden',
      )}
    >
      {children}
    </div>
  );
}
