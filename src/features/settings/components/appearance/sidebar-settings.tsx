'use client';

import { Switch } from '@/shared/components/ui/switch';
import { useThemePreferences } from '@/features/theme-two/hooks/use-theme-preferences';

export function SidebarSettings() {
  const { preferences, updatePreferences } = useThemePreferences();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium">Transparent Sidebar</h3>
        <p className="text-sm text-muted-foreground">
          Make the sidebar background transparent
        </p>
      </div>
      <Switch
        checked={preferences.sidebarTransparent}
        onCheckedChange={(checked) => updatePreferences({ sidebarTransparent: checked })}
      />
    </div>
  );
}
