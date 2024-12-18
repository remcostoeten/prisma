export type ThemeName = 'light' | 'dark' | 'dracula' | 'monokai' | 'nord' | 'tokyo-night';

export interface Theme {
  name: string;
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: {
    background: string;
    toolbar: string;
    text: string;
    accent: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: 'Light',
    background: 'bg-white',
    text: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    accent: 'bg-blue-100',
    preview: {
      background: '#ffffff',
      toolbar: '#f3f4f6',
      text: '#111827',
      accent: '#3b82f6'
    }
  },
  dark: {
    name: 'Dark',
    background: 'bg-gray-900',
    text: 'text-gray-100',
    primary: 'text-blue-400',
    secondary: 'text-gray-400',
    accent: 'bg-blue-900',
    preview: {
      background: '#111827',
      toolbar: '#1f2937',
      text: '#f9fafb',
      accent: '#60a5fa'
    }
  },
  dracula: {
    name: 'Dracula',
    background: 'bg-[#282a36]',
    text: 'text-[#f8f8f2]',
    primary: 'text-[#ff79c6]',
    secondary: 'text-[#6272a4]',
    accent: 'bg-[#44475a]',
    preview: {
      background: '#282a36',
      toolbar: '#44475a',
      text: '#f8f8f2',
      accent: '#ff79c6'
    }
  },
  monokai: {
    name: 'Monokai',
    background: 'bg-[#272822]',
    text: 'text-[#f8f8f2]',
    primary: 'text-[#a6e22e]',
    secondary: 'text-[#75715e]',
    accent: 'bg-[#49483e]',
    preview: {
      background: '#272822',
      toolbar: '#3e3d32',
      text: '#f8f8f2',
      accent: '#a6e22e'
    }
  },
  nord: {
    name: 'Nord',
    background: 'bg-[#2e3440]',
    text: 'text-[#eceff4]',
    primary: 'text-[#88c0d0]',
    secondary: 'text-[#4c566a]',
    accent: 'bg-[#3b4252]',
    preview: {
      background: '#2e3440',
      toolbar: '#3b4252',
      text: '#d8dee9',
      accent: '#88c0d0'
    }
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    background: 'bg-[#1a1b26]',
    text: 'text-[#a9b1d6]',
    primary: 'text-[#7aa2f7]',
    secondary: 'text-[#565f89]',
    accent: 'bg-[#24283b]',
    preview: {
      background: '#1a1b26',
      toolbar: '#24283b',
      text: '#c0caf5',
      accent: '#7aa2f7'
    }
  }
};

export interface ThemePreferences {
  theme: ThemeName;
  accentColor: string;
  modalOpacity: number;
  modalBlur: number;
}