import { cn } from '@/shared/helpers/cn'
import { CheckIcon } from 'lucide-react'
import type { ThemeConfig } from '@/core/types/theme'

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
        'relative overflow-hidden rounded-lg border-2 transition-all',
        isSelected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:border-border/80'
      )}
    >
      <Preview />
      <div className="absolute bottom-2 left-2 right-2 text-xs font-medium">
        {config.name}
      </div>
      {isSelected && (
        <div className="absolute right-2 top-2">
          <CheckIcon className="h-4 w-4 text-primary" />
        </div>
      )}
    </button>
  )
}
