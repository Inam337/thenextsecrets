import { fetchRoleMenuPermissions } from '@/services/backend-api';

interface MenuItem {
  menuName?: string;
  name?: string;
}

// Define available pages in order of preference for fallback
const AVAILABLE_PAGES = [
  'dashboard',
  'complaints',
  'users',
  'roles',
  'reports',
];

/**
 * Check if user has permission for a specific page
 * @param pageName The name of the page to check
 * @returns Promise<boolean>
 */
export async function hasPagePermission(pageName: string): Promise<boolean> {
  try {
    // Check if user has permission to access the page
    const menuPermissions = await fetchRoleMenuPermissions();
    const allowedMenus = menuPermissions?.response || [];

    // If we get a 503 or other server error, allow access to prevent infinite loops
    if (menuPermissions?.status === false && menuPermissions?.errorMessage?.includes('Network error')) {
      return true;
    }

    return allowedMenus.some(
      (menu: MenuItem) => (menu.menuName || menu.name)?.toLowerCase() === pageName.toLowerCase(),
    );
  } catch (error) {
    // If menu permissions can't be fetched, assume user has access
    // This prevents infinite redirects when the API is down

    return true;
  }
}

/**
 * Get the first available page the user has permission for
 * @param excludePage Optional page to exclude from the search
 * @returns Promise<string> The URL to redirect to
 */
export async function getFirstAvailablePage(excludePage?: string): Promise<string> {
  try {
    const menuPermissions = await fetchRoleMenuPermissions();

    // If backend is down, return a safe fallback
    if (menuPermissions?.status === false && menuPermissions?.errorMessage?.includes('Network error')) {
      for (const page of AVAILABLE_PAGES) {
        if (page !== excludePage?.toLowerCase()) {
          return `/${page}`;
        }
      }

      return '/';
    }

    const allowedMenus = menuPermissions?.response || [];

    if (allowedMenus.length > 0) {
      // Find the first menu that's not the excluded page
      for (const menu of allowedMenus) {
        const menuName = (menu.menuName || menu.name)?.toLowerCase();

        if (menuName && menuName !== excludePage?.toLowerCase()) {
          return `/${menuName}`;
        }
      }
    }
  } catch (error) {

  }

  // If no specific permissions are available, try to redirect to a default page
  for (const page of AVAILABLE_PAGES) {
    if (page !== excludePage?.toLowerCase()) {
      return `/${page}`;
    }
  }

  // If no fallback page is available, redirect to home
  return '/';
}

/**
 * Protect a page and redirect if user doesn't have permission
 * @param pageName The name of the page to protect
 * @param currentPath The current path (optional, for logging)
 */
export async function protectPage(pageName: string, currentPath?: string): Promise<void> {
  try {
    const hasPermission = await hasPagePermission(pageName);

    if (!hasPermission) {
      const fallbackUrl = await getFirstAvailablePage(pageName);

      // Prevent infinite redirects - if fallback is the same page, allow access
      if (fallbackUrl === currentPath || fallbackUrl === `/${pageName}`) {
        // Preventing infinite redirect for ${pageName}, allowing access
        return;
      }

      // If fallback is home and we're already on a page, allow access to prevent loops
      if (fallbackUrl === '/' && currentPath && currentPath !== '/') {
        // Preventing redirect to home from ${currentPath}, allowing access
        return;
      }

      // If backend is down (503 errors), allow access to prevent infinite loops
      if (fallbackUrl === '/' && currentPath) {
        // Preventing redirect to home from ${currentPath}, allowing access
        return;
      }

      // If backend is down (503 errors), allow access to prevent infinite loops
      window.location.href = fallbackUrl;
    }
  } catch (error) {
    // If there's any error in permission checking, allow access to prevent infinite loops

    return;
  }
}
