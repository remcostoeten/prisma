'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppearanceState = {
    modalOpacity: number;
    modalBlur: number;
    accentColor: string;
    borderRadius: number;
    fontFamily: string;
    setModalOpacity: (opacity: number) => void;
    setModalBlur: (blur: number) => void;
    setAccentColor: (color: string) => void;
    setBorderRadius: (radius: number) => void;
    setFontFamily: (font: string) => void;
};

export const useAppearanceStore = create<AppearanceState>()(
    persist(
        (set) => ({
            modalOpacity: 80,
            modalBlur: 10,
            accentColor: '#3b82f6',
            borderRadius: 8,
            fontFamily: 'system-ui',

            setModalOpacity: (opacity) => set({ modalOpacity: opacity }),
            setModalBlur: (blur) => set({ modalBlur: blur }),
            setAccentColor: (color) => set({ accentColor: color }),
            setBorderRadius: (radius) => set({ borderRadius: radius }),
            setFontFamily: (font) => set({ fontFamily: font }),
        }),
        {
            name: 'appearance-storage',
        }
    )
); 
