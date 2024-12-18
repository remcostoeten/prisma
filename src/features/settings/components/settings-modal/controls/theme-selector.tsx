'use client';

import { useSettingsStore } from '../../../stores/user-settings.store';
import { Button } from '@/shared/components/ui/button';
import { Monitor, Moon, Sun, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

const themes = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'dracula', name: 'Dracula', icon: Palette },
  { id: 'nord', name: 'Nord', icon: Palette },
  { id: 'solarized', name: 'Solarized', icon: Palette },
] as const;

export function ThemeSelector() {
  const { settings, updateSettings } = useSettingsStore((state) => ({
    settings: state.profile.settings,
    updateSettings: state.updateSettings,
  }));

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((theme) => {
        const Icon = theme.icon;
        return (
          <motion.button
            key={theme.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateSettings({ theme: theme.id as any })}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors',
              settings.theme === theme.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm">{theme.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}