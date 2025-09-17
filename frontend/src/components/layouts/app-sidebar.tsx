'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { CommonIcon } from '@/components/icons';
import {
  CommonIconNames,
  IconColors,
} from '@/components/icons/types';
import ProjectLogo from '@/assets/logo/white_logo.png';
import { cn } from '@/libs/utils';
import { NavUser } from '@/components/ui/nav-user';

interface MenuItem {
  menuName?: string;
  name?: string;
  id?: number;
}

interface AppSidebarProps {
  allowedMenus?: MenuItem[];
}

// Define route structure
interface SidebarRoute {
  label: string;
  url: string;
  icon: CommonIconNames;
  isImplemented?: boolean;
}

// Define icon and URL mappings for menu names
const menuIconMap: Record<string, CommonIconNames> = {
  dashboard: CommonIconNames.DASHBOARD_ICON,
  user: CommonIconNames.USER_ICON,
  role: CommonIconNames.USER_ACTIVE_ICON,
  complaint: CommonIconNames.FILE_ICON,
  feedbacks: CommonIconNames.FEEDBACK_ICON,
  data: CommonIconNames.DATA_ICON,
  reports: CommonIconNames.REPORT_ICON,
  notifications: CommonIconNames.NOTIFICATION_ICON,
  insights: CommonIconNames.GRAPH_ICON,
  settings: CommonIconNames.COG_ICON,
  // Add more as needed
};
const menuUrlMap: Record<string, string> = {
  dashboard: '/dashboard',
  user: '/users',
  role: '/roles',
  complaint: '/complaints',
  reports: '/reports',
  feedbacks: '/feedbacks',
  data: '/data',
  notifications: '/notifications',
  insights: '/insights',
  settings: '/settings',
  // Add more as needed
};// Default user data
const DEFAULT_USER = {
  name: 'User',
  email: '',
  avatar: '',
};

export function AppSidebar({
  allowedMenus = [],
}: AppSidebarProps) {
  const { state } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const ICON_SIZE = 16;
  // Text visibility class based on sidebar state
  const getTextVisibilityClass = () => {
    const visibilityClasses = {
      collapsed: 'opacity-0 hidden',
      expanded: 'opacity-100',
    };
    const stateClass = state === 'collapsed'
      ? visibilityClasses.collapsed
      : visibilityClasses.expanded;

    return cn('transition-opacity duration-200', stateClass);
  };

  // Helper to get header content classes
  const getHeaderContentClasses = () => {
    const baseClasses = 'w-full flex items-center h-16 border-b-2 border-b-green-700';

    if (state === 'collapsed') {
      return cn(baseClasses, 'justify-center px-0');
    }

    return cn(baseClasses, 'justify-between px-4');
  };

  // Helper to get logo container classes
  const getLogoContainerClasses = () => {
    const baseClasses = 'text-xl font-bold transition-all duration-300 ease-in-out';

    if (state === 'collapsed') {
      return cn(baseClasses, 'w-0 opacity-0 overflow-hidden max-h-0 m-0');
    }

    return cn(baseClasses, 'w-auto opacity-100');
  };

  // Helper to get trigger button classes
  const getTriggerButtonClasses = () => {
    if (state === 'collapsed') {
      return 'mx-auto';
    }

    return '-ml-1';
  };

  // Helper to get menu button classes
  const getMenuButtonClasses = (isActive: boolean) => {
    const baseClasses = 'cursor-pointer';

    if (isActive) {
      return cn(baseClasses, 'bg-sidebar-active');
    }

    return baseClasses;
  };

  // Helper to get menu item text classes
  const getMenuItemTextClasses = () => {
    const baseClasses = 'w-full text-left';
    const visibilityClasses = getTextVisibilityClass();

    return cn(baseClasses, visibilityClasses, 'mr-2');
  };

  const defaultRoutes: SidebarRoute[] = [
    {
      label: 'Dashboard',
      url: '/dashboard',
      icon: CommonIconNames.DASHBOARD_ICON,
      isImplemented: true,
    },
    {
      label: 'Roles',
      url: '/roles',
      icon: CommonIconNames.USER_ACTIVE_ICON,
      isImplemented: true,
    },
    {
      label: 'Users',
      url: '/users',
      icon: CommonIconNames.USERS_ICON,
      isImplemented: true,
    },
    {
      label: 'Complaints',
      url: '/complaints',
      icon: CommonIconNames.FILE_ICON,
      isImplemented: true,
    },
    {
      label: 'Feedbacks',
      url: '/feedbacks',
      icon: CommonIconNames.FEEDBACK_ICON,
      isImplemented: true,
    },
    {
      label: 'Data',
      url: '/data',
      icon: CommonIconNames.DATA_ICON,
      isImplemented: true,
    },
    {
      label: 'Reports',
      url: '/reports',
      icon: CommonIconNames.REPORT_ICON,
      isImplemented: true,
    },
    {
      label: 'Settings',
      url: '/settings',
      icon: CommonIconNames.COG_ICON,
      isImplemented: true,
    },
  ];
  const routes: SidebarRoute[] = defaultRoutes;
  const handleNavigation = (route: SidebarRoute) => {
    if (route.isImplemented) {
      router.push(route.url);
    }
  };

  const isRouteActive = (url: string) => {
    if (!pathname) return false;
    
    if (pathname === url) return true;

    if (url !== '/' && pathname.startsWith(url)) return true;

    return false;
  };

  const user = DEFAULT_USER; // Helper functions for rendering sidebar items
  const renderSidebarItem = (route: SidebarRoute) => {
    const isActive = isRouteActive(route.url);
    const iconClasses = 'w-4 h-4 flex items-center justify-center mr-2';

    return (
      <SidebarMenuItem key={route.url}>
        <SidebarMenuButton
          tooltip={route.label}
          className={getMenuButtonClasses(isActive)}
          onClick={() => handleNavigation(route)}
          data-active={isActive}
        >
          <div className='flex w-full items-center'>
            <CommonIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              name={route.icon}
              fill={IconColors.WHITE_COLOR_ICON}
              className={iconClasses}
            />

            <span className={getMenuItemTextClasses()}>
              {route.label}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  const renderSidebarMenu = () => {
    return routes.map(renderSidebarItem);
  };

  const renderSidebarHeader = () => {
    return (
      <SidebarHeader className="flex items-center justify-between">
        <div className={getHeaderContentClasses()}>
          <div className={getLogoContainerClasses()}>
            <Image
              src={ProjectLogo.src}
              alt="Logo"
              className="min-h-screen w-24 object-contain"
              width={96}
              height={600}
            />
          </div>
          <SidebarTrigger className={getTriggerButtonClasses()} />
        </div>
      </SidebarHeader>
    );
  };

  const renderSidebarContent = () => {
    return (
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {renderSidebarMenu()}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    );
  };

  const renderSidebarFooter = () => {
    return (
      <SidebarFooter className="flex flex-col p-0">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <NavUser
                user={user}
              />
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </SidebarFooter>
    );
  };

  return (
    <Sidebar
      collapsible="icon"
      className="h-screen bg-body text-white border-r left-0"
    >
      {renderSidebarHeader()}
      {renderSidebarContent()}
      {renderSidebarFooter()}
    </Sidebar>
  );
}

