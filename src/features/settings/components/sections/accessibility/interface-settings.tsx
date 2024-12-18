import { Slider } from "@/shared/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

export function InterfaceSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Interface Font</h3>
        <p className="text-sm text-muted-foreground">
          Set your preferred interface font.
        </p>
        <Select onValueChange={(value) => console.log("Font selected:", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="geist">Geist (Default)</SelectItem>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="system">System Font</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Font Size</h3>
        <p className="text-sm text-muted-foreground">
          Adjust the base font size for the interface.
        </p>
        <Slider
          defaultValue={[16]}
          max={24}
          min={12}
          step={1}
          onValueChange={(value) => console.log("Font size:", value)}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>
    </div>
  );
}