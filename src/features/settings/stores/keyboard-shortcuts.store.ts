import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface KeyboardShortcut {
  id: string;
  name: string;
  description: string;
  defaultKeys: string[];
  currentKeys: string[];
}

interface KeyboardShortcutsState {
  shortcuts: KeyboardShortcut[];
  updateShortcut: (id: string, keys: string[]) => void;
  resetShortcut: (id: string) => void;
  resetAllShortcuts: () => void;
}

const defaultShortcuts: KeyboardShortcut[] = [
  {
    id: 'settings',
    name: 'Open Settings',
    description: 'Opens the settings modal',
    defaultKeys: ['Ctrl', 'Comma'],
    currentKeys: ['Ctrl', 'Comma'],
  },
  {
    id: 'theme',
    name: 'Toggle Theme',
    description: 'Switch between light and dark mode',
    defaultKeys: ['Ctrl', 'T'],
    currentKeys: ['Ctrl', 'T'],
  },
  {
    id: 'search',
    name: 'Global Search',
    description: 'Open the global search dialog',
    defaultKeys: ['Ctrl', 'K'],
    currentKeys: ['Ctrl', 'K'],
  },
  {
    id: 'save',
    name: 'Save Changes',
    description: 'Save current changes',
    defaultKeys: ['Ctrl', 'S'],
    currentKeys: ['Ctrl', 'S'],
  },
];

export const useKeyboardShortcuts = create<KeyboardShortcutsState>()(
  persist(
    (set) => ({
      shortcuts: defaultShortcuts,
      updateShortcut: (id, keys) =>
        set((state) => ({
          shortcuts: state.shortcuts.map((shortcut) =>
            shortcut.id === id ? { ...shortcut, currentKeys: keys } : shortcut
          ),
        })),
      resetShortcut: (id) =>
        set((state) => ({
          shortcuts: state.shortcuts.map((shortcut) =>
            shortcut.id === id
              ? { ...shortcut, currentKeys: shortcut.defaultKeys }
              : shortcut
          ),
        })),
      resetAllShortcuts: () =>
        set((state) => ({
          shortcuts: state.shortcuts.map((shortcut) => ({
            ...shortcut,
            currentKeys: shortcut.defaultKeys,
          })),
        })),
    }),
    {
      name: 'keyboard-shortcuts',
    }
  )
);