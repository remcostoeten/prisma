'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NotificationSettings = {
    email: boolean;
    push: boolean;
    desktop: boolean;
};

type ProfileSettings = {
    notifications: NotificationSettings;
    soundEffects: boolean;
    theme: string;
    language: string;
};

type SettingsState = {
    profile: {
        settings: ProfileSettings;
    };
    updateSettings: (settings: Partial<ProfileSettings>) => void;
};

const defaultSettings: ProfileSettings = {
    notifications: {
        email: true,
        push: true,
        desktop: true,
    },
    soundEffects: true,
    theme: 'system',
    language: 'en',
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            profile: {
                settings: defaultSettings,
            },
            updateSettings: (newSettings) =>
                set((state) => ({
                    profile: {
                        ...state.profile,
                        settings: {
                            ...state.profile.settings,
                            ...newSettings,
                        },
                    },
                })),
        }),
        {
            name: 'settings-storage',
        }
    )
); 
