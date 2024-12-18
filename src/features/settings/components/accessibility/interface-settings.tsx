import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";

export function InterfaceSettings() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="font-medium">Interface Font</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Set a base interface font for Ticket.
        </p>
        <Select onValueChange={(value) => console.log("Font selected:", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter (Default)</SelectItem>
            <SelectItem value="roboto">Roboto</SelectItem>
            <SelectItem value="arial">Arial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Font Size</h3>
        <p className="text-sm text-muted-foreground">
          Set a font size that affects reading and editing views.
        </p>
        <Input
          type="range"
          min="12"
          max="24"
          defaultValue="16"
          onChange={(e) => console.log("Font size:", e.target.value)}
        />
      </div>
    </>
  );
}