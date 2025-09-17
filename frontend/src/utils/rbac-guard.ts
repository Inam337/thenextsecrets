import { redirect } from 'next/navigation';

import { fetchRoleMenuPermissions } from '@/services/backend-api';
import { MenuPermission } from '@/types/permissions';

interface MenuItem {
  menuName?: string;
  name?: string;
}

export class ForbiddenError extends Error {
  constructor(message = '403 - Not Authorized') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/**
 * Throws or redirects if the user does not have permission for the given menu.
 * @param menuName The menu name to check (e.g., 'role', 'dashboard')
 * @param redirectTo Optional path to redirect if not allowed (default: '/dashboard')
 * @param throwOnForbidden If true, throws ForbiddenError instead of redirecting
 * Usage:
 *   await requireMenuPermission('role'); // redirects if forbidden
 *   await requireMenuPermission('role', undefined, true); // throws ForbiddenError if forbidden
 */
export async function requireMenuPermission(
  menuName: string,
  redirectTo: string = '/dashboard',
  throwOnForbidden = false,
) {
  try {
    const { response: allowedMenus } = await fetchRoleMenuPermissions();
    const hasPermission = allowedMenus?.some(
      (menu: MenuItem) => (menu.menuName || menu.name)?.toLowerCase() === menuName.toLowerCase(),
    );

    if (!hasPermission) {
      if (throwOnForbidden) {
        throw new ForbiddenError();
      }

      redirect(redirectTo);
    }
  } catch (error) {
    if (throwOnForbidden) {
      throw new ForbiddenError();
    }

    redirect(redirectTo);
  }
}

/**
 * Find the first accessible menu for a user and return the redirect URL
 * @param userPermissions - Array of user menu permissions
 * @returns The URL of the first accessible menu, or null if no access
 */
export function getFirstAccessibleMenuUrl(userPermissions: MenuPermission[]): string | null {
  if (!userPermissions || userPermissions.length === 0) {
    return null;
  }

  // Define menu routes mapping
  const menuRoutes: Record<string, string> = {
    dashboard: '/dashboard',
    user: '/users',
    role: '/roles',
    complaint: '/complaints',
    report: '/reports',
  };

  // Find the first menu with any readable submenu
  for (const menu of userPermissions) {
    const menuName = menu.menuName?.toLowerCase();
    const route = menuRoutes[menuName];

    if (route && menu.subMenus?.some(subMenu => subMenu.canRead)) {
      return route;
    }
  }

  return null;
}

/**
 * Check if user has any menu access
 * @param userPermissions - Array of user menu permissions
 * @returns True if user has access to any menu
 */
export function hasAnyMenuAccess(userPermissions: MenuPermission[]): boolean {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  return userPermissions.some(menu =>
    menu.subMenus?.some(subMenu => subMenu.canRead),
  );
}
