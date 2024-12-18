import { Slider } from "@/shared/components/ui/slider";
import { useAppearanceStore } from "@/features/settings/stores/appearance.store";
import { Label } from "@/shared/components/ui/label";

export function GlassEffectControls() {
  const { modalOpacity, modalBlur, updateModalOpacity, updateModalBlur } = useAppearanceStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4">Glass Effect</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Customize the glass effect of modals and overlays
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Background Opacity</Label>
            <span className="text-sm text-muted-foreground">{modalOpacity}%</span>
          </div>
          <Slider
            value={[modalOpacity]}
            onValueChange={([value]) => updateModalOpacity(value)}
            min={30}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-primary"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Blur Effect</Label>
            <span className="text-sm text-muted-foreground">{modalBlur}px</span>
          </div>
          <Slider
            value={[modalBlur]}
            onValueChange={([value]) => updateModalBlur(value)}
            min={0}
            max={20}
            step={1}
            className="[&_[role=slider]]:bg-primary"
          />
        </div>
      </div>
    </div>
  );
}