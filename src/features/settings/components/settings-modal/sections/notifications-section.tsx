'use client';

import { Switch } from '@/shared/components/ui/switch';
import { useSettingsStore } from '@/stores/user-settings.store';
export function NotificationsSection() {
  const { settings, updateSettings } = useSettingsStore((state) => ({
    settings: state.profile.settings,
    updateSettings: state.updateSettings,
  }));

  const updateNotifications = (key: keyof typeof settings.notifications, value: boolean) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Receive email updates about your account
          </p>
        </div>
        <Switch
          checked={settings.notifications.email}
          onCheckedChange={(checked) => updateNotifications('email', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Push Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Receive push notifications in your browser
          </p>
        </div>
        <Switch
          checked={settings.notifications.push}
          onCheckedChange={(checked) => updateNotifications('push', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Desktop Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Show notifications on your desktop
          </p>
        </div>
        <Switch
          checked={settings.notifications.desktop}
          onCheckedChange={(checked) => updateNotifications('desktop', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Sound Effects</h3>
          <p className="text-sm text-muted-foreground">
            Play sounds for notifications and actions
          </p>
        </div>
        <Switch
          checked={settings.soundEffects}
          onCheckedChange={(checked) => updateSettings({ soundEffects: checked })}
        />
      </div>
    </div>
  );
}
