import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

interface Breadcrumb {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: Breadcrumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={item.href}
            className={`ml-1 hover:text-foreground ${
              index === items.length - 1 ? "text-foreground" : ""
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}