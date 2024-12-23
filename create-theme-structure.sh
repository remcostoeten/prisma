#!/bin/bash

# Root directories
mkdir -p src/{features,shared,core,app}

# Feature: Settings
mkdir -p src/features/settings/{components,types,constants}
mkdir -p src/features/settings/components/theme-selector/previews

# Shared
mkdir -p src/shared/{stores/theme,providers,hooks}

# Core
mkdir -p src/core/{config/theme,types}

# App
mkdir -p src/app/settings/appearance

# Create files with basic content
cat > src/core/types/theme.ts << 'EOF'
export type Theme = 'dark' | 'light' | 'tokyo-night' | 'catppuccin'

export type ThemeConfig = {
  name: string
  value: Theme
  description?: string
}
EOF

cat > src/features/settings/constants/theme-options.ts << 'EOF'
import type { ThemeConfig } from '@/core/types/theme'

export const THEME_OPTIONS: ThemeConfig[] = [
  {
    name: "Supabase Dark",
    value: "dark",
    description: "Default dark theme inspired by Supabase"
  },
  {
    name: "Light",
    value: "light",
    description: "Clean light theme with subtle contrasts"
  },
  {
    name: "Tokyo Night",
    value: "tokyo-night",
    description: "Dark theme inspired by Tokyo Night"
  },
  {
    name: "Catppuccin",
    value: "catppuccin",
    description: "Soothing pastel theme"
  }
]
EOF

cat > src/shared/stores/theme/theme-store.ts << 'EOF'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/core/types/theme'

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.setAttribute('data-theme', theme)
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
EOF

cat > src/shared/hooks/use-theme.ts << 'EOF'
import { useThemeStore } from '@/shared/stores/theme/theme-store'
import { THEME_OPTIONS } from '@/features/settings/constants/theme-options'

export function useTheme() {
  const { theme, setTheme } = useThemeStore()
  
  const currentTheme = THEME_OPTIONS.find(t => t.value === theme)
  
  return {
    theme,
    setTheme,
    currentTheme,
    availableThemes: THEME_OPTIONS
  }
}
EOF

cat > src/features/settings/components/theme-selector/theme-preview.tsx << 'EOF'
import { cn } from "@/shared/helpers/cn"
import { CheckIcon } from "lucide-react"
import type { ThemeConfig } from "@/core/types/theme"

type ThemePreviewProps = {
  config: ThemeConfig
  isSelected: boolean
  onSelect: () => void
}

export function ThemePreview({
  config,
  isSelected,
  onSelect
}: ThemePreviewProps) {
  const Preview = () => {
    switch (config.value) {
      case 'dark':
        return <DarkPreview />
      case 'light':
        return <LightPreview />
      case 'tokyo-night':
        return <TokyoNightPreview />
      case 'catppuccin':
        return <CatppuccinPreview />
    }
  }

  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative rounded-lg overflow-hidden border-2 transition-all",
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-border/80"
      )}
    >
      <Preview />
      <div className="absolute bottom-2 left-2 right-2 text-xs font-medium">
        {config.name}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2">
          <CheckIcon className="w-4 h-4 text-primary" />
        </div>
      )}
    </button>
  )
}
EOF

cat > src/features/settings/components/theme-selector/index.tsx << 'EOF'
import { useTheme } from '@/shared/hooks/use-theme'
import { ThemePreview } from './theme-preview'
import { Card } from '@/shared/components/ui/card'
import { Label } from '@/shared/components/ui/label'

export function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme()

  return (
    <Card className="p-6">
      <Label className="text-base">Interface Theme</Label>
      <p className="text-sm text-muted-foreground mb-4">
        Select or customize your UI theme
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {availableThemes.map((t) => (
          <ThemePreview
            key={t.value}
            config={t}
            isSelected={theme === t.value}
            onSelect={() => setTheme(t.value)}
          />
        ))}
      </div>
    </Card>
  )
}
EOF

cat > src/app/settings/appearance/page.tsx << 'EOF'
import { ThemeSelector } from '@/features/settings/components/theme-selector'

export default function AppearancePage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-2xl font-semibold mb-8">Appearance Settings</h1>
      <div className="space-y-8">
        <ThemeSelector />
      </div>
    </div>
  )
}
EOF

# Create preview components
for theme in dark light tokyo-night catppuccin; do
  cat > src/features/settings/components/theme-selector/previews/${theme}-preview.tsx << EOF
export default function ${theme^}Preview() {
  return (
    <div className="w-full aspect-video bg-[#0f0f0f] p-2 relative">
      <div className="absolute top-0 left-0 right-0 h-6 bg-[#171717] flex items-center px-2">
        <div className="w-2 h-2 rounded-full bg-[#3ecf8e]" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2 w-16 bg-[#3ecf8e] rounded" />
        <div className="h-2 w-24 bg-[#b4b4b4] rounded" />
        <div className="h-2 w-20 bg-[#b4b4b4] rounded" />
      </div>
    </div>
  )
}
EOF
done

# Make the script executable
chmod +x create-theme-structure.sh

echo "Theme structure created successfully!" 
