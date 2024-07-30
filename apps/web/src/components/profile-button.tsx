import { ChevronDown, LogOut } from 'lucide-react'

import { auth } from '@/app/auth/auth'
import { getInitialsFromName } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function ProfileButton() {
  const { user } = await auth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
        <Avatar className="size-9">
          {user.avatarUrl && (
            <AvatarImage src={user?.avatarUrl} alt={`${user.name}'s avatar`} />
          )}
          <AvatarFallback>{getInitialsFromName(user.name!)}</AvatarFallback>
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={12}>
        <DropdownMenuItem className="cursor-pointer" asChild>
          {/* We are using the html's anchor coz Link from Next makes a prefetch,
            since it's sign out we don't want to prefetch it. */}
          <a href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4" />
            Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
