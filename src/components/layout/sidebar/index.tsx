'use client'

import type { ComponentType } from 'react'
import type { User } from '@/core/types/user'
import { cn } from '@/shared/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, UserCircle, Menu } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { useUser } from '@/contexts/user-context'
import { Button } from '@/shared/components/ui/button'
import { navigation } from '@/core/config/routes/dashboard-routes'

type SidebarProps = {
    children?: React.ReactNode
    className?: string
}

export default function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { user, logout } = useUser()

    const NavLink = ({ item, isActive }: { item: typeof navigation[0]['items'][0], isActive: boolean }) => {
        const link = (
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md group relative",
                    "text-sm font-medium",
                    "transition-colors duration-200",
                    isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
            >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                    <>
                        <span>{item.title}</span>
                        {item.isNew && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                New
                            </span>
                        )}
                        {item.badge && (
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[20px] h-5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                                {item.badge}
                            </span>
                        )}
                    </>
                )}
            </Link>
        )

        if (isCollapsed && item.tooltip) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {link}
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={20}>
                            <div className="flex flex-col">
                                <span>{item.title}</span>
                                {item.tooltip && (
                                    <span className="text-xs text-muted-foreground">{item.tooltip}</span>
                                )}
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }

        return link
    }

    return (
        <aside
            className={cn(
                "flex flex-col h-full relative group transition-all duration-300",
                "border-r border-border/50",
                "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                isCollapsed ? "w-16" : "w-64",
                className
            )}
        >
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "absolute -right-4 top-6",
                    "h-8 w-8 rounded-full",
                    "border border-border/50",
                    "bg-background/95 backdrop-blur",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-200"
                )}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                ) : (
                    <ChevronLeft className="h-4 w-4" />
                )}
            </Button>

            <div className="flex flex-col h-full">
                <div className="flex items-center h-16 px-4 border-b border-border/50">
                    {!isCollapsed ? (
                        <Link href="/dashboard" className="text-xl font-semibold">
                            Dashboard
                        </Link>
                    ) : (
                        <Menu className="w-6 h-6 mx-auto" />
                    )}
                </div>

                <nav className="flex-1 p-2 space-y-6 overflow-y-auto">
                    {navigation.map((section) => {
                        if (section.id === 'bottom') return null

                        const sectionItems = section.items.filter(item => !item.alignBottom)
                        if (sectionItems.length === 0) return null

                        return (
                            <div key={section.id} className="space-y-1">
                                {section.id !== 'main' && !isCollapsed && (
                                    <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        {section.id.replace('-', ' ')}
                                    </h4>
                                )}
                                {sectionItems.map((item) => (
                                    <NavLink
                                        key={item.id}
                                        item={item}
                                        isActive={pathname === item.href}
                                    />
                                ))}
                            </div>
                        )
                    })}
                </nav>

                <div className="mt-auto p-2 space-y-1 border-t border-border/50">
                    {navigation
                        .find(section => section.id === 'bottom')
                        ?.items.map((item) => (
                            <NavLink
                                key={item.id}
                                item={item}
                                isActive={pathname === item.href}
                            />
                        ))}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className={cn(
                                "w-full p-2 flex items-center gap-3",
                                "rounded-md hover:bg-accent/50",
                                "transition-colors duration-200"
                            )}>
                                {user?.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || 'User'}
                                        className="w-8 h-8 rounded-full ring-1 ring-border/50"
                                    />
                                ) : (
                                    <UserCircle className="w-8 h-8" />
                                )}
                                {!isCollapsed && (
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                                    </div>
                                )}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isCollapsed ? "center" : "end"} className="w-56">
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/profile" className="cursor-pointer">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings" className="cursor-pointer">
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => logout()}
                            >
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </aside>
    )
} 
