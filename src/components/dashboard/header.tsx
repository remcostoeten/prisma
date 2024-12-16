'use client'

import { useUser } from "@/contexts/user-context"
import { UserNav } from "./user-nav"
import { Breadcrumbs } from "./breadcrumb"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const { user } = useUser()
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    return paths.slice(1).map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, index + 2).join('/')
    }))
  }

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <Breadcrumbs items={getBreadcrumbs()} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
}
