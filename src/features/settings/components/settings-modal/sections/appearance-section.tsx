'use client';

import { Slider } from '@/shared/components/ui/slider';
import { Switch } from '@/shared/components/ui/switch';
import { Separator } from '@/shared/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { ThemeSelector } from '../controls/theme-selector';
import { AccentColorPicker } from '../controls/accent-color-picker';
import { GlassEffectControls } from '../controls/glass-effect-controls';
import { KeyboardShortcutEditor } from '../controls/keyboard-shortcut-editor';
import { useSettingsStore } from '@/stores/settings';



export default function AppearanceSection() {
  const { settings, updateSettings } = useSettingsStore((state) => ({
    settings: state.profile.settings,
    updateSettings: state.updateSettings,
  }))

  return (
    <div className="space-y-6">
      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theme">Theme & Interface</TabsTrigger>
          <TabsTrigger value="keyboard">Keyboard & Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground">
              Choose your preferred theme and appearance settings.
            </p>
            <div className="mt-4">
              <ThemeSelector />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium">Accent Color</h3>
            <p className="text-sm text-muted-foreground">
              Select your preferred accent color for the interface.
            </p>
            <div className="mt-4">
              <AccentColorPicker />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium">Glass Effect</h3>
            <p className="text-sm text-muted-foreground">
              Customize the glass effect of modals and overlays.
            </p>
            <div className="mt-4">
              <GlassEffectControls />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium">Interface</h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium">Sidebar Opacity</h4>
                <Slider
                  value={[settings.sidebarOpacity]}
                  onValueChange={([value]: [number]) => updateSettings({ sidebarOpacity: value })}
                  min={30}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Compact Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact interface layout
                  </p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked: boolean) => updateSettings({ compactMode: checked })}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keyboard" className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">Keyboard Shortcuts</h3>
            <p className="text-sm text-muted-foreground">
              Customize keyboard shortcuts for quick access to features.
            </p>
            <div className="mt-4">
              <KeyboardShortcutEditor />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium">Accessibility</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Reduce Motion</h4>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked: boolean) => updateSettings({ reduceMotion: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">High Contrast</h4>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked: boolean) => updateSettings({ highContrast: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Screen Reader Optimizations</h4>
                  <p className="text-sm text-muted-foreground">
                    Enhance compatibility with screen readers
                  </p>
                </div>
                <Switch
                  checked={settings.screenReaderMode}
                  onCheckedChange={(checked: boolean) => updateSettings({ screenReaderMode: checked })}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
