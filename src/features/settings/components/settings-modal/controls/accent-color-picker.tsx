'use client';

import { useSettingsStore } from '../../../stores/user-settings.store';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

const accentColors = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Yellow', value: '#ca8a04' },
] as const;

export function AccentColorPicker() {
  const { settings, updateSettings } = useSettingsStore((state) => ({
    settings: state.profile.settings,
    updateSettings: state.updateSettings,
  }));

  return (
    <div className="grid grid-cols-6 gap-2">
      {accentColors.map((color) => (
        <motion.button
          key={color.value}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => updateSettings({ accentColor: color.value })}
          className={cn(
            'w-8 h-8 rounded-full relative',
            settings.accentColor === color.value && 'ring-2 ring-primary ring-offset-2'
          )}
          style={{ backgroundColor: color.value }}
          aria-label={`Select ${color.name} accent color`}
        />
      ))}
    </div>
  );
}