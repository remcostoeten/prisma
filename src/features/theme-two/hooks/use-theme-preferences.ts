'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import type { ThemePreferences, ThemeName } from '../types';
import { themes } from '../types';

type ExtendedThemeName = ThemeName | 'system';

const THEME_PREFERENCES_KEY = 'theme-preferences';

export function useThemePreferences() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [preferences, setPreferences] = useState<ThemePreferences & { theme: ExtendedThemeName }>({
    theme: 'light', // Changed 'system' to 'light' to match the expected type
    accentColor: '#3b82f6',
    modalOpacity: 80,
    modalBlur: 10,
  });

  useEffect(() => {
    const savedPrefs = localStorage.getItem(THEME_PREFERENCES_KEY);
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs) as ThemePreferences & { theme: ExtendedThemeName };
        setPreferences(parsed);
        setTheme(parsed.theme);

        document.documentElement.className = document.documentElement.className
          .replace(/\btheme-\w+\b/g, '')
          .trim();

        if (parsed.theme !== 'system' && parsed.theme !== 'light' && parsed.theme !== 'dark') {
          document.documentElement.classList.add(`theme-${parsed.theme}`);
        }

        const currentTheme = themes[parsed.theme === 'system' ? (resolvedTheme as ThemeName) || 'light' : parsed.theme];
        const accentColor = currentTheme?.preview?.accent;

        if (accentColor) {
          const hsl = hexToHSL(accentColor);
          if (hsl) {
            document.documentElement.style.setProperty('--accent-hue', hsl.h.toString());
            document.documentElement.style.setProperty('--accent-saturation', `${hsl.s}%`);
            document.documentElement.style.setProperty('--accent-lightness', `${hsl.l}%`);
          }
        }
      } catch (error) {
        console.error('Error loading theme preferences:', error);
      }
    }
  }, [setTheme, resolvedTheme]);

  const updatePreferences = (newPrefs: Partial<ThemePreferences & { theme: ExtendedThemeName }>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem(THEME_PREFERENCES_KEY, JSON.stringify(updated));

      if (newPrefs.theme) {
        setTheme(newPrefs.theme);

        document.documentElement.className = document.documentElement.className
          .replace(/\btheme-\w+\b/g, '')
          .trim();

        if (newPrefs.theme !== 'system' && newPrefs.theme !== 'light' && newPrefs.theme !== 'dark') {
          document.documentElement.classList.add(`theme-${newPrefs.theme}`);
        }

        const currentTheme = themes[newPrefs.theme === 'system' ? (resolvedTheme as ThemeName) || 'light' : newPrefs.theme];
        const accentColor = currentTheme?.preview?.accent;

        if (accentColor) {
          const hsl = hexToHSL(accentColor);
          if (hsl) {
            document.documentElement.style.setProperty('--accent-hue', hsl.h.toString());
            document.documentElement.style.setProperty('--accent-saturation', `${hsl.s}%`);
            document.documentElement.style.setProperty('--accent-lightness', `${hsl.l}%`);
          }
        }
      }

      return updated;
    });
  };

  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  return {
    preferences,
    updatePreferences,
    currentTheme: theme,
    resolvedTheme,
  };
}
