'use client'

import Sidebar from '@/components/layout/sidebar'
import { cn } from '@/shared/lib/utils'

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar className="w-64 hidden md:block" />
            <main className={cn(
                "flex-1 overflow-y-auto",
                "bg-background",
                "p-6"
            )}>
                {children}
            </main>
        </div>
    )
} 
