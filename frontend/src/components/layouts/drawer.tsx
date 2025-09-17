// components/common/CustomDrawer.tsx
'use client';

import { ReactNode } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

type CustomDrawerProps = {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
};

const CustomDrawer = ({
  trigger,
  title,
  description,
  children,
}: CustomDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          {title && <DrawerTitle>{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="p-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
