'use client'

import { useUser } from '@/state/auth'
import { Button } from '@/shared/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

type User = {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
}

export default function UserMenu() {
    const { user, logout } = useUser()

    if (!user) {
        return (
            <Link href="/login">
                <Button variant="outline">Sign in</Button>
            </Link>
        )
    }

    const initials = user.name
        ? user.name
            .split(' ')
            .map((name: string) => name[0])
            .join('')
        : user.email?.charAt(0)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ''} alt={user.name || ''} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => logout()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 
