'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { UserProvider } from "@/contexts/user-context"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <UserProvider>
            <ResizablePanelGroup direction="horizontal" className="min-h-screen">
                <ResizablePanel
                    defaultSize={20}
                    collapsible={true}
                    minSize={10}
                    maxSize={20}
                    collapsedSize={4}
                    onCollapse={() => setIsCollapsed(true)}
                    onExpand={() => setIsCollapsed(false)}
                    className={cn("bg-muted")}
                >
                    <DashboardNav isCollapsed={isCollapsed} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={80}>
                    <div className="flex flex-col h-full">
                        <DashboardHeader />
                        <main className="flex-1 p-6 overflow-auto">
                            {children}
                        </main>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </UserProvider>
    )
}
