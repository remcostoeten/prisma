'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen max-h-screen bg-background text-foreground transition-colors duration-300">
        {children}
      </div>
    </NextThemesProvider>
  );
}
