import { useTheme } from '@/shared/hooks/use-theme'
import { ThemePreview } from './theme-preview'
import { Card } from '@/shared/components/ui/card'
import { Label } from '@/shared/components/ui/label'

export function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme()

  return (
    <Card className="p-6">
      <Label className="text-base">Interface Theme</Label>
      <p className="mb-4 text-sm text-muted-foreground">
        Select or customize your UI theme
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
