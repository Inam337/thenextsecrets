'use client';

import { useRouter } from 'next/navigation';

import { Avatar } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/libs/utils';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CommonIcon } from '@/components/icons/common-icons';
import { CommonIconNames, IconColors } from '@/components/icons/types';
import { useAuthStore } from '@/stores/auth';
import { AppConstants } from '@/common/app-constants';


interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function NavUser({ user }: NavUserProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const AVATAR_ICON_SIZE = 24;
  const MOB_AVATAR_ICON_SIZE = 32;
  const COG_ICON_SIZE = 16;
  const { isMobile, state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const displayName = user.name;
  
  const handleLogout = async () => {
    console.log('🔄 User initiated logout from nav-user component');

    try {
      await logout();
      // Redirect to login page
      router.push(AppConstants.Routes.Public.Login);
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={isCollapsed ? displayName : undefined}
              size={isCollapsed ? 'default' : 'lg'}
              className={cn(
                `data-[state=open]:bg-sidebar-accent cursor-pointer
                data-[state=open]:text-sidebar-accent-foreground w-full`,
                isCollapsed && 'justify-center',
              )}
            >
              <Avatar
                className={cn(
                  'flex items-center justify-center rounded-sm h-8 w-8',
                  isCollapsed && 'mx-auto',
                )}
              >
                <CommonIcon
                  width={isCollapsed ? AVATAR_ICON_SIZE : MOB_AVATAR_ICON_SIZE}
                  height={isCollapsed ? AVATAR_ICON_SIZE : MOB_AVATAR_ICON_SIZE}
                  name={CommonIconNames.AVATAR_ICON}
                  fill={IconColors.WHITE_COLOR_ICON}
                />
              </Avatar>
              <div
                className={cn(
                  'grid flex-1 text-sm leading-tight text-left',
                  isCollapsed && 'hidden',
                )}
              >
                <span className="truncate font-semibold">
                  {displayName}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 cursor-pointer text-left">
                <Avatar className="h-8 w-8 rounded-sm">
                  <CommonIcon
                    width={MOB_AVATAR_ICON_SIZE}
                    height={MOB_AVATAR_ICON_SIZE}
                    name={CommonIconNames.AVATAR_ICON}
                    fill={IconColors.GRAY_COLOR_ICON}
                  />
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="truncate font-semibold">
                    {displayName}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              <div className="flex items-center gap-2 cursor-pointer">
                <CommonIcon
                  width={COG_ICON_SIZE}
                  height={COG_ICON_SIZE}
                  name={CommonIconNames.COG_ICON}
                  fill={IconColors.GRAY_COLOR_ICON}
                />
                <span>Settings</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <div className="flex items-center gap-2 cursor-pointer">
                <CommonIcon
                  width={COG_ICON_SIZE}
                  height={COG_ICON_SIZE}
                  name={CommonIconNames.LOGOUT_ICON}
                  fill={IconColors.GRAY_COLOR_ICON}
                />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
