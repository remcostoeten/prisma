'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '@/core/hooks/use-theme';

type ThemeId = 'light' | 'dark' | 'dracula' | 'nord' | 'solarized';

type Theme = {
  id: ThemeId;
  name: string;
  icon: typeof Sun | typeof Moon | typeof Palette;
}

const themes: readonly Theme[] = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'dracula', name: 'Dracula', icon: Palette },
  { id: 'nord', name: 'Nord', icon: Palette },
  { id: 'solarized', name: 'Solarized', icon: Palette },
] as const;

export function ThemeSelector(): JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        return (
          <motion.button
            key={themeOption.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme(themeOption.id)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors',
              theme === themeOption.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm">{themeOption.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
