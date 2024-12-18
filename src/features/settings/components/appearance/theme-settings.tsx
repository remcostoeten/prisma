'use client';

import { useThemePreferences } from '@/features/theme-two/hooks/use-theme-preferences';
import { cn } from '@/shared/lib/utils';
import { Monitor, Moon, Sun, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { themes } from '@/features/theme-two/types';

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
  dracula: Palette,
  catppuccin: Palette,
  vesper: Palette,
} as const;

export function ThemeSettings() {
  const { preferences, updatePreferences, resolvedTheme } = useThemePreferences();

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'dracula':
        return 'from-purple-500 to-pink-500';
      case 'catppuccin':
        return 'from-blue-400 to-purple-400';
      case 'vesper':
        return 'from-red-500 to-orange-500';
      case 'light':
        return 'from-orange-500 to-amber-500';
      case 'dark':
        return 'from-slate-700 to-slate-900';
      case 'system':
        return resolvedTheme === 'dark' ? 'from-slate-700 to-slate-900' : 'from-orange-500 to-amber-500';
      default:
        return 'from-indigo-500 to-purple-500';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Theme</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred theme
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(themes).map(([key, theme]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updatePreferences({ theme: key as keyof typeof themes })}
            className={cn(
              'flex flex-col items-center p-4 rounded-lg border transition-all',
              preferences.theme === key
                ? 'border-primary bg-accent'
                : 'border-border hover:border-primary/50 hover:bg-accent/50'
            )}
          >
            <div
              className={cn(
                'h-16 w-16 rounded-lg bg-gradient-to-br flex items-center justify-center',
                getThemeGradient(key)
              )}
            >
              {(() => {
                const Icon = themeIcons[key as keyof typeof themeIcons] || Sun;
                return <Icon className="w-6 h-6 text-white" />;
              })()}
            </div>
            <span
              className={cn(
                'mt-2 text-sm',
                preferences.theme === key
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {theme.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
