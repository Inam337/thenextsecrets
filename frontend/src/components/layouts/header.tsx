import { FC } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const WelcomeHeader: FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center
    justify-between p-4 bg-gray-50 rounded-lg"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold">Welcome Back!</span>
        <span className="text-gray-500">•</span>
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/images/avatar.png"
              alt="Adeel Ahmad"
            />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <span className="text-md font-medium">Mr. Adeel Ahmad</span>
        </div>
      </div>
      <div className="mt-2 md:mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Date Range ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>This Week</DropdownMenuItem>
            <DropdownMenuItem>This Month</DropdownMenuItem>
            <DropdownMenuItem>Last Month</DropdownMenuItem>
            <DropdownMenuItem>Custom Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default WelcomeHeader;
