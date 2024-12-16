'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/shared/components/ui/button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Settings, Home, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardNavProps {
  isCollapsed: boolean
}

export function DashboardNav({ isCollapsed }: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ]

  return (
    <ScrollArea className="h-full py-6">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                <Button
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", {
                    "px-2": isCollapsed,
                  })}
                >
                  <route.icon className={cn("h-4 w-4", {
                    "mr-2": !isCollapsed,
                  })} />
                  {!isCollapsed && route.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}