'use client';

import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';

import { cn } from '@/libs/utils';
import MainLayout from '@/components/layouts/main-layout';
import SuspenseLoading from '@/components/ui/suspense-loading';
import LogoGreen from '@/assets/logo/green_logo.png';



interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = memo(function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const ICON_SIZE = 48;
  const LOGO_WIDTH = 270;
  const LOGO_HEIGHT = 96;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading spinner instead of null to prevent page flash
  if (!isClient) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative mx-auto w-[270px] h-[96px] mb-0 animate-pulse">
          <Image
            src={LogoGreen}
            alt="Login Banner"
            className="object-cover object-left grayscale-25 opacity-50"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
          />
        </div>
        <SuspenseLoading size="lg" />
      </div>
    );
  }


  return (
    <MainLayout>
      <div className="space-y-6">
        {children}
      </div>
    </MainLayout>
  );
});

export default DashboardLayout;
