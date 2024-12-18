import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnimationPreferences {
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const useAnimationPreferences = create<AnimationPreferences>()(
  persist(
    (set) => ({
      isEnabled: true,
      setEnabled: (enabled) => set({ isEnabled: enabled }),
    }),
    {
      name: 'animation-preferences',
    }
  )
);