import * as React from 'react';

import { cn } from '@/libs/utils';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

interface TabsTriggerProps {
  tabValue: string;
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <div
      className={cn('w-full', className)}
      role="tablist"
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child)
          && (child.type as React.ComponentType).displayName === 'TabsList'
        ) {
          return React.cloneElement(
            child as React.ReactElement<TabsListProps>,
            {
              activeTab: value,
              onTabChange: onValueChange,
            },
          );
        }

        return child;
      })}
    </div>
  );
}

export function TabsList({
  children,
  activeTab,
  onTabChange,
  className,
}: TabsListProps) {
  return (
    <div
      className={cn('inline-flex items-center p-1 rounded-md', className)}
      role="tablist"
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child)
          && (child.type as React.ComponentType).displayName === 'TabsTrigger'
        ) {
          return React.cloneElement(
            child as React.ReactElement<TabsTriggerProps>,
            {
              activeTab,
              onTabChange,
            },
          );
        }

        return child;
      })}
    </div>
  );
}

TabsList.displayName = 'TabsList';

export function TabsTrigger({
  tabValue,
  children,
  activeTab,
  onTabChange,
  className,
}: TabsTriggerProps) {
  const isActive = activeTab === tabValue;

  return (
    <button
      type="button"
      role="tab"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
        'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'data-[state=active]:bg-background data-[state=active]:text-foreground',
        'data-[state=active]:shadow-sm',
        className,
      )}
      onClick={() => onTabChange && onTabChange(tabValue)}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
}

TabsTrigger.displayName = 'TabsTrigger';
