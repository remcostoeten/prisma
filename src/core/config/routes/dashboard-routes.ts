/**
 * This file defines the navigation structure for the dashboard, including sections and items.
 * It exports the navigation structure as an array of NavSection objects.
 */

import { Home, Database, TableProperties, Terminal, KeyRound, FolderOpen, Zap, Radio, Lightbulb, BarChart, List, FileText, Blocks, Settings, Command, User } from 'lucide-react'

export type NavItem = {
    id: string;
    title: string;
    href: string;
    icon: typeof Home;
    isActive?: boolean;
    badge?: number;
    isNew?: boolean;
    tooltip?: string;
    alignBottom?: boolean;
}

export type NavSection = {
    id: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        id: "main",
        items: [
            {
                id: "home",
                title: "Home",
                href: "/dashboard/projects",
                icon: Home,
            },
        ],
    },
    {
        id: "editors",
        items: [
            {
                id: "table-editor",
                title: "Table Editor",
                href: "/dashboard/project/editor",
                icon: TableProperties,
            },
            {
                id: "sql-editor",
                title: "SQL Editor",
                href: "/dashboard/project/sql/new",
                icon: Terminal,
            },
        ],
    },
    {
        id: "core-services",
        items: [
            {
                id: "database",
                title: "Database",
                href: "/dashboard/project/database/schemas",
                icon: Database,
            },
            {
                id: "authentication",
                title: "Authentication",
                href: "/dashboard/project/auth/users",
                icon: KeyRound,
            },
            {
                id: "storage",
                title: "Storage",
                href: "/dashboard/project/storage/buckets",
                icon: FolderOpen,
            },
            {
                id: "edge-functions",
                title: "Edge Functions",
                href: "/dashboard/project/functions",
                icon: Zap,
            },
            {
                id: "realtime",
                title: "Realtime",
                href: "/dashboard/project/realtime/inspector",
                icon: Radio,
            },
        ],
    },
    {
        id: "tools",
        items: [
            {
                id: "advisors",
                title: "Advisors",
                href: "/dashboard/project/advisors/security",
                icon: Lightbulb,
                isNew: true,
            },
            {
                id: "reports",
                title: "Reports",
                href: "/dashboard/project/reports",
                icon: BarChart,
            },
            {
                id: "logs",
                title: "Logs",
                href: "/dashboard/project/logs/explorer",
                icon: List,
            },
            {
                id: "api-docs",
                title: "API Docs",
                href: "/dashboard/project/api",
                icon: FileText,
            },
            {
                id: "integrations",
                title: "Integrations",
                href: "/dashboard/project/integrations",
                icon: Blocks,
            },
        ],
    },
    {
        id: "settings",
        items: [
            {
                id: "project-settings",
                title: "Project Settings",
                href: "/dashboard/project/settings/general",
                icon: Settings,
                alignBottom: true,
            },
            {
                id: "commands",
                title: "Commands",
                href: "#",
                icon: Command,
                alignBottom: true,
            },
            {
                id: "profile",
                title: "Profile",
                href: "#",
                icon: User,
                alignBottom: true,
            },
        ],
    },
    {
        id: "bottom",
        items: [
            {
                id: "project-settings",
                title: "Project Settings",
                href: "/dashboard/project/settings/general",
                icon: Settings,
                alignBottom: true,
            },
            {
                id: "commands",
                title: "Commands",
                href: "#",
                icon: Command,
                alignBottom: true,
            },
            {
                id: "profile",
                title: "Profile",
                href: "#",
                icon: User,
                alignBottom: true,
            },
        ],
    },
]

