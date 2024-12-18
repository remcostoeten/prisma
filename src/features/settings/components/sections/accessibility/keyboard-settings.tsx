import { Button } from "@/shared/components/ui/button";
import { Switch } from "@/shared/components/ui/switch";

export function KeyboardSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Keyboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Enable enhanced keyboard navigation.
          </p>
        </div>
        <Switch onCheckedChange={(checked) => console.log("Keyboard nav:", checked)} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Keyboard Shortcuts</h3>
          <p className="text-sm text-muted-foreground">
            View and customize keyboard shortcuts.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => console.log("Open shortcuts")}
        >
          Configure
        </Button>
      </div>
    </div>
  );
}