import { Home, Table2, Terminal, Database, Lock, FolderClosed, Zap, Radio, Lightbulb, BarChart2, List, FileText, Blocks, Settings } from 'lucide-react'

export interface Route {
  href: string
  icon: React.ComponentType
  label: string
}

const routes: Route[] = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/table-editor', icon: Table2, label: 'Table Editor' },
  { href: '/sql-editor', icon: Terminal, label: 'SQL Editor' },
  { href: '/database', icon: Database, label: 'Database' },
  { href: '/auth', icon: Lock, label: 'Authentication' },
  { href: '/storage', icon: FolderClosed, label: 'Storage' },
  { href: '/edge-functions', icon: Zap, label: 'Edge Functions' },
  { href: '/realtime', icon: Radio, label: 'Realtime' },
  { href: '/advisors', icon: Lightbulb, label: 'Advisors' },
  { href: '/reports', icon: BarChart2, label: 'Reports' },
  { href: '/logs', icon: List, label: 'Logs' },
  { href: '/api', icon: FileText, label: 'API Docs' },
  { href: '/integrations', icon: Blocks, label: 'Integrations' },
  { href: '/settings', icon: Settings, label: 'Project Settings' },
]

export function searchRoutes(query: string): Route[] {
  const lowercaseQuery = query.toLowerCase()
  return routes.filter(route => 
    route.label.toLowerCase().includes(lowercaseQuery) || 
    route.href.toLowerCase().includes(lowercaseQuery)
  )
}

export function getRoutes(): Route[] {
  return routes
}

