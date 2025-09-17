// Accessibility utilities for better a11y scores

export const focusManagement = {
  // Trap focus within a modal or dialog
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  // Announce to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div');

    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);

    announcer.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },

  // Skip to main content link
  createSkipLink: () => {
    const skipLink = document.createElement('a');

    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = [
      'sr-only',
      'focus:not-sr-only',
      'focus:absolute',
      'focus:top-0',
      'focus:left-0',
      'bg-primary',
      'text-white',
      'p-2',
      'z-50',
    ].join(' ');
    document.body.insertBefore(skipLink, document.body.firstChild);
  },
};

export const colorContrast = {
  // Check if color contrast meets WCAG AA standards
  meetsWCAGAA: (foreground: string, background: string): boolean => {
    const getLuminance = (color: string): number => {
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      // Calculate relative luminance
      const sRGB = [r, g, b].map((c) => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });

      return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return ratio >= 4.5; // WCAG AA standard
  },
};

export const keyboardNavigation = {
  // Handle arrow key navigation for lists
  handleArrowKeys: (
    event: KeyboardEvent,
    items: NodeListOf<HTMLElement>,
    currentIndex: number,
    onIndexChange: (index: number) => void,
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();

        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;

        items[nextIndex].focus();
        onIndexChange(nextIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();

        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;

        items[prevIndex].focus();
        onIndexChange(prevIndex);
        break;
      case 'Home':
        event.preventDefault();
        items[0].focus();
        onIndexChange(0);
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1].focus();
        onIndexChange(items.length - 1);
        break;
    }
  },
};

// Screen reader only text utility
export const srOnly = 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';
