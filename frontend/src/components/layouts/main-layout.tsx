'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  Breadcrumb,
} from '@/components/ui/breadcrumb';
import {
  SidebarProvider,
  SidebarInset,
  SidebarMobileTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { CommonIcon } from '@/components/icons';
import { CommonIconNames, IconColors } from '@/components/icons/types';
import { cn } from '@/libs/utils';
import { AppSidebar } from '@/components/layouts/app-sidebar';

interface MenuItem {
  menuName?: string;
  name?: string;
  id?: number;
}

interface MainLayoutProps {
  children: React.ReactNode;
  allowedMenus?: MenuItem[];
}

const MainLayout = ({
  children,
  allowedMenus = [],
}: MainLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const ICON_SIZE = 22;
  // Check if we're on the dashboard page
  const isDashboardPage = pathname === '/dashboard';
  // Helper function to render back button icon
  const renderBackButtonIcon = () => {
    return (
      <CommonIcon
        width={ICON_SIZE}
        height={ICON_SIZE}
        name={CommonIconNames.ARROW_CHEVRON_LEFT_ICON}
        fill={IconColors.BLACK_COLOR_ICON}
        className="transition-transform"
      />
    );
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    if (!pathname) return <Breadcrumb items={[]} />;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      ...pathSegments
        .map((segment, index) => {
          const segmentPath = `/${pathSegments
            .slice(0, index + 1)
            .join('/')}`;
          const isLast = index === pathSegments.length - 1;

          // Skip "details" segment in breadcrumb display
          if (segment === 'details') {
            return null;
          }

          const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1);

          return {
            label: segmentName,
            href: isLast ? undefined : segmentPath,
            isCurrent: isLast,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null),
    ];

    return <Breadcrumb items={breadcrumbItems} />;
  };

  // Helper function to render page title
  const renderPageTitle = () => {
    return generateBreadcrumbs();
  };

  // Header component that uses the sidebar context
  const HeaderContent = () => {
    const { isMobile } = useSidebar();

    return (
      <header
        className={cn(
          `h-16 sticky top-0 z-50 flex shrink-0 items-center border-b
           border-gray-300 bg-white shadow-sm`,
        )}
      >
        <div className='flex w-full items-center justify-between'>
          <div className="flex items-center justify-start gap-2">
            {isMobile && <SidebarMobileTrigger className="mx-2" />}
            <div className={cn('flex items-center gap-4')}>
              {!isDashboardPage && (
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="hidden lg:flex cursor-pointer items-center text-gray-700
                     hover:text-black font-medium text-base px-4 h-[64px]"
                  >
                    <div className="flex items-center gap-2">
                      {renderBackButtonIcon()}
                      Back
                    </div>
                  </button>

                  <div className="hidden md:block w-px bg-gray-300 h-[64px]"></div>
                </div>

              )}
              {isDashboardPage && (
                <div className="w-2 bg-white-300 h-[64px]"></div>
              )}
              {renderPageTitle()}
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 px-4">

          </div>
        </div>
      </header>
    );
  };

  return (
    <SidebarProvider
      defaultOpen={true}
      className="w-full min-h-screen h-screen flex"
    >
      <AppSidebar
        allowedMenus={allowedMenus}
      />
      <SidebarInset className="flex flex-col flex-1 w-full h-full min-h-screen overflow-hidden">
        <HeaderContent />
        <main className="flex-1 p-4 w-full min-w-0 overflow-x-auto text-left">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
