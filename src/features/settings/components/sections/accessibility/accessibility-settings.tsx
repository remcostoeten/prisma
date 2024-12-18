import { Switch } from "@/shared/components/ui/switch";
import { useAnimationPreferences } from "@/features/theme-two/hooks/use-animation-preferences";

export function AccessibilitySettings() {
  const { isEnabled: animationsEnabled, setEnabled: setAnimationsEnabled } = useAnimationPreferences();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">High Contrast Mode</h3>
          <p className="text-sm text-muted-foreground">
            Increase contrast for better visibility.
          </p>
        </div>
        <Switch onCheckedChange={(checked) => console.log("High contrast:", checked)} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Reduce Motion</h3>
          <p className="text-sm text-muted-foreground">
            Minimize animations and transitions.
          </p>
        </div>
        <Switch
          checked={!animationsEnabled}
          onCheckedChange={(checked) => setAnimationsEnabled(!checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Screen Reader Optimizations</h3>
          <p className="text-sm text-muted-foreground">
            Enhance compatibility with screen readers.
          </p>
        </div>
        <Switch onCheckedChange={(checked) => console.log("Screen reader:", checked)} />
      </div>
    </div>
  );
}
