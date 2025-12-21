'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/ui/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/shadcn-ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/shadcn-ui/avatar';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Display a loading skeleton or similar
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />;
  }

  if (!session) {
    return (
      <Button onClick={() => signIn()} variant="outline">
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    );
  }

  const user = session.user;
  const fallbackInitials = user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image ?? ''} alt={user?.name ?? 'User'} />
            <AvatarFallback>{fallbackInitials.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
